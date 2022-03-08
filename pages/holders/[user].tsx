import deta from '../../db';
import {List, Transaction} from '../../link';
import {transaction, user} from '../../type';
import Head from 'next/head';
import {
  Stat,
  StatLabel,
  StatNumber,
  Box,
  Heading,
  Link as Clink,
  BoxProps
} from '@chakra-ui/react'

const db = deta.Base("transactions")
const us = deta.Base('amounts');

function Bx(p: BoxProps) {
  return <Box my="4" {...p} p="4" borderWidth="1px" borderRadius="lg" />
}

export default function Index(data: {tr: transaction[], ba: user, user: any}) {
  return (
    <>

    <Head><title>{data.user.username} — 🎈</title></Head>

    <Bx>
    <Heading as="h1">{data.user.username}</Heading>
    <Clink href={'https://forum.gethopscotch.com/u/'+data.user.username} target="_blank" rel="noreferrer">See {data.user.username} on the Hopscotch Forum ↗</Clink>
    </Bx>

    <Bx>
    <Stat>
    <StatLabel>Balance</StatLabel>
    <StatNumber>{data.ba.value} balloons</StatNumber>
    </Stat>
    </Bx>

    <List>
    {!data.tr?'nothing here':data.tr.map((v: transaction) => <Transaction tr={v} key={v.key} />)}
    </List>
    </>
  );
}

export async function getServerSideProps({params}) {
  let data = await db.fetch({from: params.user!.toLowerCase()})
  let data0 = await db.fetch({to: params.user!.toLowerCase()})
  const acdata = data.items.concat(data0.items)
  const acData = acdata.sort((a, b) => new Date(b.time as number).valueOf() - new Date(a.time as number).valueOf())
  const u0 = await fetch('https://forum.gethopscotch.com/u/'+params.user+'.json');
  const user = await u0.json();
  return {props: {tr: acData, ba: await us.get(params.user!), user: user.user}};
};
