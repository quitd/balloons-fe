import deta from '../../db';
import {
  Heading,
  Divider
} from '@chakra-ui/react';
import {List, Transaction} from '../../link';
import {transaction} from '../../type';
import Head from 'next/head';

const db = deta.Base("transactions")

export default function Transactions({acData}) {
  return (
    <div className="top">
    <Head><title>Transactions — 🎈</title></Head>
    <Heading as="h1">Transactions 🎈</Heading>
    <Divider />
    <List>
    {acData.map((v: transaction) => <Transaction key={v.key} tr={v} />)}
    </List>
    </div>
  );
}

export async function getServerSideProps() {
  const data = await db.fetch()
  const acData = data.items.sort((a, b) => new Date(b.time as number).valueOf() - new Date(a.time as number).valueOf())
  return {props: {acData}};
}
