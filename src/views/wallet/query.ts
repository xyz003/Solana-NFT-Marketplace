import { gql } from "@apollo/client"

// const { wallet } = useWallet()
//@ts-ignore
// const key = wallet?.publicKey.toString()

export const QUERY_SELL_ACTIVITIES = gql`
  query WalletSellActivities($id: String) {
    transactions(limit: 10, offset: 1, seller: $id, type: "SALE") {
      totalCount
      nodes {
        collection
        mint
        price
        type
        buyer
        seller
        id
        epoch
        contract
        tags
      }
    }
  }
`

export const QUERY_BUY_ACTIVITIES = gql`
  query WalletBuyActivities($id: String) {
    transactions(limit: 10, offset: 1, buyer: $id, type: "BUY") {
      totalCount
      nodes {
        collection
        mint
        price
        type
        buyer
        seller
        id
        epoch
        contract
        tags
      }
    }
  }
`
