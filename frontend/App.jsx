import { Suspense, useEffect } from "react";
import { Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { ChakraBaseProvider, extendBaseTheme, Box, Flex } from "@chakra-ui/react";
import chakraTheme from '@chakra-ui/theme'
import { SignedInOrRedirect, SignedOutOrRedirect } from "@gadgetinc/react";
import Index from "./routes/index";
import Chat from "./routes/chat";
import { ChatProvider } from "./hooks/useChat";

const App = () => {
  useEffect(() => {
    document.title = `Gadget x ChatGPT`;
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <SignedOutOrRedirect path="/chat-gpt">
              <Index />
            </SignedOutOrRedirect>
          }
        />
        <Route
          path="chat-gpt"
          element={
            <SignedInOrRedirect>
              <ChatProvider>
                <Chat />
              </ChatProvider>
            </SignedInOrRedirect>
          }
        />
      </Route>
    )
  );

  return (
    <div>
      <Suspense fallback={<></>}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
};

const { Textarea } = chakraTheme.components
const theme = extendBaseTheme({
  components: {
    Textarea
  }
})

const Layout = () => {
  return (
    <ChakraBaseProvider theme={theme}>
      <Box height="100vh" width="100vw" bgColor="gray.700">
        <Flex height="100vh" width="100vw" overflow="hidden">
          <Outlet />
        </Flex>
      </Box>
    </ChakraBaseProvider>
  );
};

export default App;
