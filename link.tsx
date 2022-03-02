import NextLink from 'next/link';
import {
  Link as Clink,
  VStack,
  StackDivider,
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText
} from '@chakra-ui/react';

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
  <StatHelpText><Link href={"/transactions/"+v.key}>{new Date(v.time).toString()}</Link></StatHelpText>
  </Stat>
}
