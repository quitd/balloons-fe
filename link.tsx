import NextLink from 'next/link';
import {
  Link as Clink,
  VStack,
  StackDivider,
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useToast,
  Badge,
  Button
} from '@chakra-ui/react';
import {useState} from 'react';
import { useRouter } from 'next/router';

export function Link(props) {
  return <NextLink {...props} passHref><Clink {...props}></Clink></NextLink>
}

export function List(props) {
  return <Box my="4" p="4" borderWidth="1px" borderRadius="lg"><VStack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch" {...props} /></Box>
}

export function Transaction(p) {
  const v = p.tr;
  return <Stat>
  <StatLabel><Link href={"/holders/"+v.from}>{v.from}</Link> → <Link href={"/holders/"+v.to}>{v.to}</Link></StatLabel>
  <StatNumber>{v.amount} balloons</StatNumber>
  <StatHelpText><Link href={"/transactions/"+v.key}>{new Date(v.time).toString()}</Link> — <Clink href={'https://forum.gethopscotch.com/p/'+v.key} target="_blank" rel="noreferrer">forum post ↗</Clink></StatHelpText>
  </Stat>
}

export function Rescan() {
  const toast = useToast();
  const [l, sL] = useState(false);

  return <Button colorScheme="green" px="6" isLoading={l} onClick={async () => {
    sL(true);
    const d = await fetch('/api/rescan');
    const {ok} = await d.json();
    sL(false);
    toast({
      title: ok ? 'The topic is being fetched' : 'The topic was fetched in the last 5 minutes.',
      description: ok ? "Give it a second then click the refresh button." : 'Please wait before doing another fetch',
      status: ok ? 'success' : 'warning',
      duration: 5000,
      isClosable: true
    })
  }}>Rescan topic</Button>
}

export function Refresh() {
  const r = useRouter();

  return <Button variant="ghost" onClick={() => r.replace(r.asPath)}>Refresh</Button>
}

export function getBadge(n: number) {
  return [null, <Badge mx="1" colorScheme="purple">🎨 Art Shop</Badge>, <Badge mx="1" colorScheme="blue">💻 Code Shop</Badge>, <Badge mx="1" colorScheme="gray">🔎 Eye Spy</Badge>, <Badge mx="1" colorScheme="red">📈 Maintainer</Badge>][n]
}
