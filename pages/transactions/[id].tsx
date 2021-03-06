import {Transaction, List} from '../../link';
import deta from '../../db';
import Head from 'next/head';

const db = deta.Base('transactions');

export default function Trans({data}) {
  return <><Head><title>Transaction {data.key} — 🎈</title></Head><List><Transaction tr={data} /></List></>
}

export async function getServerSideProps({params}) {
  const data = await db.get(params.id);
  return {props: {data}};
}
