import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Collection = {
  __typename?: 'Collection';
  bannerUrl?: Maybe<Scalars['String']>;
  collectionId?: Maybe<Scalars['String']>;
  creator?: Maybe<Scalars['String']>;
  creatorEmail?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  discord?: Maybe<Scalars['String']>;
  disputedMessage?: Maybe<Scalars['String']>;
  endpoint?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  isCurated?: Maybe<Scalars['Boolean']>;
  isDerivative?: Maybe<Scalars['Boolean']>;
  isNsfw?: Maybe<Scalars['Boolean']>;
  mints?: Maybe<Array<Maybe<Scalars['String']>>>;
  name?: Maybe<Scalars['String']>;
  publishedEpoch?: Maybe<Scalars['Int']>;
  thumbnail?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  verifeyed?: Maybe<Scalars['Boolean']>;
  volumeLast24h?: Maybe<Scalars['Int']>;
  volumeLastUpdatedAt?: Maybe<Scalars['Int']>;
  volumePast7days?: Maybe<Scalars['Int']>;
  volumePast24h?: Maybe<Scalars['Int']>;
  volumeTotal?: Maybe<Scalars['Int']>;
  walletAddressList?: Maybe<Array<Maybe<Scalars['String']>>>;
  website?: Maybe<Scalars['String']>;
};

export type CollectionList = {
  __typename?: 'CollectionList';
  nodes?: Maybe<Array<Maybe<Collection>>>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type MintList = {
  __typename?: 'MintList';
  nodes?: Maybe<Array<Maybe<MintMetadata>>>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type MintMetadata = {
  __typename?: 'MintMetadata';
  collection?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lastSeenSignature?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['String']>;
};

export type Offer = {
  __typename?: 'Offer';
  addEpoch?: Maybe<Scalars['Int']>;
  bump?: Maybe<Scalars['Int']>;
  collection?: Maybe<Scalars['String']>;
  contract?: Maybe<Scalars['String']>;
  creators?: Maybe<Array<Maybe<Scalars['String']>>>;
  downvotesCount?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  is_nft?: Maybe<Scalars['Boolean']>;
  mint?: Maybe<Scalars['String']>;
  offerName?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
  upvotesCount?: Maybe<Scalars['Int']>;
  uri?: Maybe<Scalars['String']>;
  verifeyed?: Maybe<Scalars['Boolean']>;
};

export type OfferList = {
  __typename?: 'OfferList';
  nodes?: Maybe<Array<Maybe<Offer>>>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type RootQuery = {
  __typename?: 'RootQuery';
  collections?: Maybe<CollectionList>;
  mints?: Maybe<MintList>;
  offers?: Maybe<OfferList>;
  transactions?: Maybe<TransactionList>;
};


export type RootQueryCollectionsArgs = {
  bannerUrl?: InputMaybe<Scalars['String']>;
  collectionId?: InputMaybe<Scalars['String']>;
  creator?: InputMaybe<Scalars['String']>;
  creatorEmail?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  discord?: InputMaybe<Scalars['String']>;
  disputedMessage?: InputMaybe<Scalars['String']>;
  endpoint?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  isCurated?: InputMaybe<Scalars['Boolean']>;
  isDerivative?: InputMaybe<Scalars['Boolean']>;
  isNsfw?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  mints?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
  publishedEpoch?: InputMaybe<Scalars['Int']>;
  thumbnail?: InputMaybe<Scalars['String']>;
  twitter?: InputMaybe<Scalars['String']>;
  verifeyed?: InputMaybe<Scalars['Boolean']>;
  volumeLast24h?: InputMaybe<Scalars['Int']>;
  volumeLastUpdatedAt?: InputMaybe<Scalars['Int']>;
  volumePast7days?: InputMaybe<Scalars['Int']>;
  volumePast24h?: InputMaybe<Scalars['Int']>;
  volumeTotal?: InputMaybe<Scalars['Int']>;
  walletAddressList?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  website?: InputMaybe<Scalars['String']>;
};


export type RootQueryMintsArgs = {
  collection?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  lastSeenSignature?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  tags?: InputMaybe<Scalars['String']>;
};


export type RootQueryOffersArgs = {
  addEpoch?: InputMaybe<Scalars['Int']>;
  bump?: InputMaybe<Scalars['Int']>;
  collection?: InputMaybe<Scalars['String']>;
  contract?: InputMaybe<Scalars['String']>;
  creators?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  downvotesCount?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  is_nft?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  mint?: InputMaybe<Scalars['String']>;
  offerName?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
  owner?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Int']>;
  upvotesCount?: InputMaybe<Scalars['Int']>;
  uri?: InputMaybe<Scalars['String']>;
  verifeyed?: InputMaybe<Scalars['Boolean']>;
};


export type RootQueryTransactionsArgs = {
  bump?: InputMaybe<Scalars['Int']>;
  bumpAuthority?: InputMaybe<Scalars['Int']>;
  buyer?: InputMaybe<Scalars['String']>;
  collection?: InputMaybe<Scalars['String']>;
  contract?: InputMaybe<Scalars['String']>;
  epoch?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  mint?: InputMaybe<Scalars['String']>;
  offer?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
  owner?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Int']>;
  salesTaxRecepient?: InputMaybe<Scalars['String']>;
  seller?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type Transaction = {
  __typename?: 'Transaction';
  bump?: Maybe<Scalars['Int']>;
  bumpAuthority?: Maybe<Scalars['Int']>;
  buyer?: Maybe<Scalars['String']>;
  collection?: Maybe<Scalars['String']>;
  contract?: Maybe<Scalars['String']>;
  epoch?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  mint?: Maybe<Scalars['String']>;
  offer?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
  salesTaxRecepient?: Maybe<Scalars['String']>;
  seller?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type TransactionList = {
  __typename?: 'TransactionList';
  nodes?: Maybe<Array<Maybe<Transaction>>>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type WalletSellActivitiesQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
}>;


export type WalletSellActivitiesQuery = { __typename?: 'RootQuery', transactions?: { __typename?: 'TransactionList', totalCount?: number | null, nodes?: Array<{ __typename?: 'Transaction', collection?: string | null, mint?: string | null, price?: number | null, type?: string | null, buyer?: string | null, seller?: string | null, id?: string | null, epoch?: number | null, contract?: string | null, tags?: string | null } | null> | null } | null };

export type WalletBuyActivitiesQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
}>;


export type WalletBuyActivitiesQuery = { __typename?: 'RootQuery', transactions?: { __typename?: 'TransactionList', totalCount?: number | null, nodes?: Array<{ __typename?: 'Transaction', collection?: string | null, mint?: string | null, price?: number | null, type?: string | null, buyer?: string | null, seller?: string | null, id?: string | null, epoch?: number | null, contract?: string | null, tags?: string | null } | null> | null } | null };


export const WalletSellActivitiesDocument = gql`
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
    `;

/**
 * __useWalletSellActivitiesQuery__
 *
 * To run a query within a React component, call `useWalletSellActivitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useWalletSellActivitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWalletSellActivitiesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useWalletSellActivitiesQuery(baseOptions?: Apollo.QueryHookOptions<WalletSellActivitiesQuery, WalletSellActivitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WalletSellActivitiesQuery, WalletSellActivitiesQueryVariables>(WalletSellActivitiesDocument, options);
      }
export function useWalletSellActivitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WalletSellActivitiesQuery, WalletSellActivitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WalletSellActivitiesQuery, WalletSellActivitiesQueryVariables>(WalletSellActivitiesDocument, options);
        }
export type WalletSellActivitiesQueryHookResult = ReturnType<typeof useWalletSellActivitiesQuery>;
export type WalletSellActivitiesLazyQueryHookResult = ReturnType<typeof useWalletSellActivitiesLazyQuery>;
export type WalletSellActivitiesQueryResult = Apollo.QueryResult<WalletSellActivitiesQuery, WalletSellActivitiesQueryVariables>;
export const WalletBuyActivitiesDocument = gql`
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
    `;

/**
 * __useWalletBuyActivitiesQuery__
 *
 * To run a query within a React component, call `useWalletBuyActivitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useWalletBuyActivitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWalletBuyActivitiesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useWalletBuyActivitiesQuery(baseOptions?: Apollo.QueryHookOptions<WalletBuyActivitiesQuery, WalletBuyActivitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WalletBuyActivitiesQuery, WalletBuyActivitiesQueryVariables>(WalletBuyActivitiesDocument, options);
      }
export function useWalletBuyActivitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WalletBuyActivitiesQuery, WalletBuyActivitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WalletBuyActivitiesQuery, WalletBuyActivitiesQueryVariables>(WalletBuyActivitiesDocument, options);
        }
export type WalletBuyActivitiesQueryHookResult = ReturnType<typeof useWalletBuyActivitiesQuery>;
export type WalletBuyActivitiesLazyQueryHookResult = ReturnType<typeof useWalletBuyActivitiesLazyQuery>;
export type WalletBuyActivitiesQueryResult = Apollo.QueryResult<WalletBuyActivitiesQuery, WalletBuyActivitiesQueryVariables>;