import scan from '../../scan';
import deta from '../../db';

const d = deta.Base('conf')

export default async function Scan(_, res) {
  const last = await d.get('lasttime');
  const g = (new Date().getTime() - (last.value as number)) / (1000 * 60) > 5;
  if(g) {
    await scan();
  }
  res.json({
    ok: g
  })
}
