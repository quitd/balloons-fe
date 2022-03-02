import deta from '../../db';
import {Link, List, Transaction} from '../../link';
import {useRouter} from 'next/router';
import {transaction} from '../../type';
import Head from 'next/head';
import {
  Stat,
  StatLabel,
  StatNumber,
  Box,
  Heading,
  Link as Clink
} from '@chakra-ui/react'

const db = deta.Base("transactions")
const us = deta.Base('amounts');

function Bx(p) {
  return <Box my="4" {...p} p="4" borderWidth="1px" borderRadius="lg" />
}

export default function Index(data) {
  const un = useRouter().query

  return (
    <div className="top">

    <Head><title>{data.user.username} — 🎈</title></Head>

    <Bx>
    <Heading as="h1">{data.user.username}</Heading>
    <Clink href={'https://forum.gethopscotch.com/u/'+data.user.username} target="_blank" rel="noreferrer">See {data.user.username} on the Hopscotch Forum ↗</Clink>
    </Bx>

    <Bx>
    <Stat>
    <StatLabel>Balance</StatLabel>
    <StatNumber>{data.ba.amount} balloons</StatNumber>
    </Stat>
    </Bx>

    <List>
    {!data.tr?'nothing here':data.tr.map((v: transaction) => <Transaction tr={v} key={v.key} />)}
    </List>
    </div>
  );
}

function str(v: transaction, me: string) {
  if(v.from === me) return <>Sent {v.amount} balloons to <Link href={"/holders/"+v.to}>{v.to}</Link> on {new Date(v.time).toString()}</>
  else return <>Received {v.amount} balloons from <Link href={'/holders/'+v.from}>{v.from}</Link> on {new Date(v.time).toString()}</>
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
