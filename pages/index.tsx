import {Link, List, Transaction, Rescan, Refresh} from '../link'
import deta from '../db';
import Head from 'next/head';
import {Heading, Divider, HStack} from '@chakra-ui/react';

const db = deta.Base("transactions")

export default function Index({data}) {
  return (
    <>
    <Head>
    <title>Balloons 🎈</title>
    </Head>
    <Heading as="h1">
    Balloons 🎈
    </Heading>
    <Divider />
    <HStack>
    <Heading w="full" as="h2" size="md">Latest transaction</Heading>
    <Refresh />
    <Rescan />
    </HStack>
    <List>
    <Transaction tr={data} />
    </List>
    <Link href="/transactions">See all transactions →</Link>
    <Divider />
    <Heading as="h2" size="md">See the list of holders</Heading>
    <Link href="/holders">See the list →</Link>
    </>
  );
}

export async function getServerSideProps() {
  const data = await db.fetch()
  const acData = data.items.sort((a, b) => new Date(b.time as number).valueOf() - new Date(a.time as number).valueOf())[0]
  return {
    props: {
      data: acData
    }
  }
}
