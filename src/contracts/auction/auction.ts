import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token,
  AccountLayout
} from "@solana/spl-token"
import * as anchor from "@project-serum/anchor"
import {
  PublicKey,
  Connection,
  TransactionInstruction,
  Keypair,
  LAMPORTS_PER_SOL,
  GetProgramAccountsConfig,
  Commitment,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction
} from "@solana/web3.js"
import { WalletAdapter } from "../../contexts/wallet"
import { sendTransaction } from "../../contexts/connection"
import { decodeMetadata, getMetadataAccount } from "../../actions/metadata"
import Wallet from "@project-serum/sol-wallet-adapter"
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

import { AUCTION_CONTRACT_ID } from "../../constants/contract_id"
import { TOKEN_ACCOUNT_LAYOUT } from "../../utils/layout"
import { idl } from './idl/auction'

// 7Dj2rz1kHeayEKMBZHZLcT1r8XBw9YTxTgk1jyi8ZVYe Program ID

const commitment = "confirmed"
const poolPubkey = new PublicKey('EMP3cStPbAdCF7GRxU2ZFo7ace3SHRu3Qp5YPZYU5GjT');

const AUCTION_CONTRACT = new PublicKey(AUCTION_CONTRACT_ID)

async function getProvider(connection: Connection, wallet: WalletAdapter) {
  let provider = new anchor.Provider(connection, wallet as typeof Wallet, {
    // preflightCommitment: "recent",
    preflightCommitment: "processed"
  })
  return provider;
}

async function loadProgram(connection: Connection, wallet: WalletAdapter) {
  let provider = new anchor.Provider(connection, wallet as typeof Wallet, {
    preflightCommitment: "recent",
  })
  const program = new anchor.Program(
    idl as anchor.Idl,
    AUCTION_CONTRACT,
    provider
  )
  return program
}

async function getPoolSigner(programId: any) {
  return await PublicKey.findProgramAddress(
    [poolPubkey.toBuffer()],
    programId
  );
}

async function initializePool(connection: Connection, clientWallet: WalletAdapter) {
  //THIS IS TOKEN ID
  let vaultMintPubkey = new PublicKey('9EkFkgmbR7J1QJ52maR7RGFDVXkSn3EpKMsa4Bc5Hu6k');
  // let envProvider = anchor.Provider.env();
  //     envProvider.commitment = 'pending';
  let provider = await getProvider(connection, clientWallet);
  const program = await loadProgram(connection, clientWallet);
  let poolKeypair = anchor.web3.Keypair.generate();
  let poolPubkey = poolKeypair.publicKey;

  let keypair = anchor.web3.Keypair.generate();
  let pubkey = keypair.publicKey;

  await connection.requestAirdrop(
    keypair.publicKey,
    1
  );
  // await sendLamports(provider, pubkey, 0.001)

  let vaultObject = new Token(provider.connection, vaultMintPubkey, TOKEN_PROGRAM_ID, clientWallet! as any);
  // let lptokenPubkey = await vaultObject.createAssociatedTokenAccount(pubkey)
  // await vaultObject.mintTo(lptokenPubkey, envProvider.wallet.payer, [], 1000000);
  console.log('here is intializPool')

  const [
    _poolSigner,
    _nonce,
  ] = await anchor.web3.PublicKey.findProgramAddress(
    [poolKeypair.publicKey.toBuffer()],
    program.programId
  );
  let poolSigner = _poolSigner;
  let poolNonce = _nonce;

  let tokenVault = await vaultObject.createAccount(poolSigner);
  console.log(tokenVault, 'this is pool vault')

  // let nft = await createNFT(provider, keypair, pubkey);

  let admin = {
    keypair,
    pubkey,
    poolKeypair,
    poolSigner,
    poolNonce,
    tokenVault,
    // nft: nft.nftAccount,
    // nftMint: nft.mint,
  }
  console.log(poolPubkey.toBase58(), '---poolPubkey---')

  try {
    await program.rpc.initializePool(
      poolNonce,
      {
        accounts: {
          authority: provider.wallet.publicKey,
          poolSigner: poolSigner,
          vault: tokenVault,
          pool: poolPubkey,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: anchor.web3.SystemProgram.programId,
        },
        signers: [poolKeypair],
        instructions: [
          await program.account.pool.createInstruction(poolKeypair,),
        ],
      }
    );
  } catch (err) {
    console.log(err)
  }
}

export async function createAuction(connection: Connection,
  clientWallet: WalletAdapter,
  mintStr: string,
  price: number
) {

  let provider = await getProvider(connection, clientWallet);
  const program = await loadProgram(connection, clientWallet);
  const [poolSigner] = await getPoolSigner(program.programId);
  const walletPubkey = provider.wallet.publicKey;
  var mintPubKey = new PublicKey(mintStr);

  const [
    _auctionPubkey, _auctionNonce,
  ] = await anchor.web3.PublicKey.findProgramAddress(
    [walletPubkey.toBuffer(), poolPubkey.toBuffer(), mintPubKey.toBuffer()],
    program.programId
  );

  let auctionPubkey = _auctionPubkey;
  let auctionNonce = _auctionNonce;

  const nftMint = new Token(provider.connection, mintPubKey, TOKEN_PROGRAM_ID, walletPubkey! as any);
  const nftAssociatedAccount = await Token.getAssociatedTokenAddress(ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, mintPubKey, walletPubkey);
  const nftAccountInfo = await provider.connection.getAccountInfo(nftAssociatedAccount);

  if (nftAccountInfo === null) {
    let tx = new anchor.web3.Transaction();
    tx.add(Token.createAssociatedTokenAccountInstruction(ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, mintPubKey, nftAssociatedAccount, walletPubkey, walletPubkey));
    await program.provider.send(tx, []);
  }

  const nftAccounts = await provider.connection.getTokenAccountsByOwner(poolSigner, { mint: nftMint.publicKey });
  console.log(nftAccounts, 'find nft account in pool')
  let auctionNftToAccount: any;
  if (nftAccounts.value.length == 0) {
    try {
      const balanceNeeded = await Token.getMinBalanceRentForExemptAccount(provider.connection);
      const newAccount = Keypair.generate();
      const transaction = new Transaction();
      transaction.add(SystemProgram.createAccount({
        fromPubkey: walletPubkey,
        newAccountPubkey: newAccount.publicKey,
        lamports: balanceNeeded,
        space: AccountLayout.span,
        programId: TOKEN_PROGRAM_ID
      }));
      transaction.add(Token.createInitAccountInstruction(TOKEN_PROGRAM_ID, mintPubKey, newAccount.publicKey, poolSigner));
      console.log('create account to pool')
      await program.provider.send(transaction, [newAccount]);
      console.log('account created')
      auctionNftToAccount = newAccount.publicKey;
    } catch (error) {
      console.log(error);
      return;
    }
  } else {
    auctionNftToAccount = nftAccounts.value[0].pubkey;
    console.log(auctionNftToAccount, 'account already exist')
  }

  // auctionNftToAccount = await nftMint.createAccount(poolSigner);

  let amount = new anchor.BN(price);
  let account = await program.account.auction.all();
  console.log(account)
  try {
    console.log('send rpc transaciton for create auction')
    await program.rpc.createAuction(
      auctionNonce,
      amount,
      {
        accounts: {
          pool: poolPubkey,
          auctionNftToAccount: auctionNftToAccount,
          auction: auctionPubkey,
          creator: walletPubkey,
          mint: mintPubKey,
          auctionNftFromAccount: nftAssociatedAccount,
          poolSigner: poolSigner,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: anchor.web3.SystemProgram.programId,
        },
      }
    );
  } catch (e) {
    console.log(e)
  }
}