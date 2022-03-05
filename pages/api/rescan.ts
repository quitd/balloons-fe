import scan from '../../scan';

export default async function Scan(_, res) {
  /*await fetch('https://api.github.com/repos/quitd/balloons-be/actions/workflows/21097005/dispatches', {
    method: 'post',
    body: JSON.stringify({ref: 'master'}),
    headers: {
      Authorization: 'token '+process.env.GH
    }
  })*/
  await scan();
  res.end();
}
