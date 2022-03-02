import deta from '../../db';
import {Link, List} from '../../link';
import {Heading, Grid, Divider} from '@chakra-ui/react';
import {transaction} from '../../type';
import Head from 'next/head';

const db = deta.Base("amounts")

export default function Balance({data}) {
  return (
    <div className="top">
    <Head><title>Holders — 🎈</title></Head>
    <Heading as="h1">Holders</Heading>
    <Divider />
    <List>
    {data.map((v: transaction) => <Grid key={v.key} templateColumns="2fr 1fr"><Link href={'/holders/'+v.key}>{v.key}</Link><span>{v.amount} balloons</span></Grid>)}
    </List>
    </div>
  );
}

export async function getServerSideProps() {
  const data = await db.fetch()
  return {props: {data: data.items.sort((b,c) => (c.amount as number) - (b.amount as number))}};
};
