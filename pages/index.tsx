import Link from 'next/link';
import str from '../str';
import deta from '../db';
import Head from 'next/head';

const db = deta.Base("transactions")

export default function Index({data}) {
  return (
    <div className="top">
    <Head>
    <title>Balloons 🎈</title>
    </Head>
    <h1>Balloons 🎈</h1>
    <hr />
    <h2>Latest transaction</h2>
    <ul className="tr">
    <li>{!data ? 'none' : str(data)}</li>
    </ul>
    <Link href="/transactions">See all transactions</Link>
    <hr />
    <h2>See the list of holders</h2>
    <Link href="/holders">See the list</Link>
    </div>
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
