import deta from '../../db';
import {Link, getBadge} from '../../link';
import {Heading, Th, Divider, Table, Tr, Td} from '@chakra-ui/react';
import {user} from '../../type';
import Head from 'next/head';

const db = deta.Base("amounts")

export default function Balance({data}) {
  return (
    <>
    <Head><title>Holders — 🎈</title></Head>
    <Heading as="h1">Holders 🎈</Heading>
    <Divider />
    <Table>
    <Tr><Th>Username</Th><Th>Badges</Th><Th isNumeric>Balance</Th></Tr>
    {data.map((v: user) => <Tr key={v.key}><Td><Link href={'/holders/'+v.key}>{v.key}</Link></Td><Td>{v.badges?v.badges.map(v => getBadge(v)):''}</Td><Td isNumeric>{v.value} balloons</Td></Tr>)}
    </Table>
    </>
  );
}

export async function getServerSideProps() {
  const data = await db.fetch()
  return {props: {data: data.items.sort((b,c) => (c.amount as number) - (b.amount as number))}};
};
