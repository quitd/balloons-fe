import deta from '../../db';
import {
  Heading,
  Divider,
  HStack
} from '@chakra-ui/react';
import {List, Transaction, Rescan, Refresh} from '../../link';
import {transaction} from '../../type';
import Head from 'next/head';

const db = deta.Base("transactions")

export default function Transactions({acData}) {
  return (
    <>
    <Head><title>Transactions — 🎈</title></Head>
    <HStack><Heading w="full" as="h1">Transactions 🎈</Heading><Refresh /><Rescan /></HStack>
    <Divider />
    <List>
    {acData.map((v: transaction) => <Transaction key={v.key} tr={v} />)}
    </List>
    </>
  );
}

export async function getServerSideProps() {
  const data = await db.fetch()
  const acData = data.items.sort((a, b) => new Date(b.time as number).valueOf() - new Date(a.time as number).valueOf())
  return {props: {acData}};
}
