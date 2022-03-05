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

  return <Button colorScheme="green" size="sm" isLoading={l} onClick={async () => {
    sL(true);
    await fetch('/api/rescan');
    sL(false);
    toast({
      title: 'The topic is being scanned',
      description: "Give it a second then click the refresh button.",
      status: 'success',
      duration: 5000,
      isClosable: true
    })
  }}>Rescan topic</Button>
}

export function Refresh() {
  const r = useRouter();

  return <Button variant="ghost" onClick={() => r.replace(r.asPath)}>Refresh</Button>
}
