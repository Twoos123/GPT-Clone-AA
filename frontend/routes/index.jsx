import Icon from "../assets/google.svg";
import { LinkBox, LinkOverlay, Image, Flex } from "@chakra-ui/react";

export default function () {
  return (
    <Flex flex="1" justifyContent="center" alignSelf="center">
      <LinkBox
        as="a"
        href="/auth/google/start"
        display="flex"
        paddingY={3}
        paddingX={4}
        borderRadius="md"
        borderWidth="1px"
        borderColor="gray.600"
        bgColor="gray.700"
        color="gray.100"
        textDecoration="none"
        _hover={{ textDecoration: "none", bgColor: "gray.600" }}
      >
        <Image src={Icon} boxSize={6} marginRight={3} />
        <LinkOverlay>Sign In with Google</LinkOverlay>
      </LinkBox>
    </Flex>
  );
}
