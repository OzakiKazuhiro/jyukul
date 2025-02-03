import React from "react";
import { Link as InertiaLink, usePage, router } from "@inertiajs/react";
import {
    Box,
    Heading,
    HStack,
    Link,
    Flex,
    Text,
    Button,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    VStack,
    Avatar,
} from "@chakra-ui/react";
import { HamburgerIcon, SettingsIcon } from "@chakra-ui/icons";

const MainLayout = ({ children, title }) => {
    const { auth, csrf_token } = usePage().props;

    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();

    const handleLogout = (e) => {
        router.post(route("logout"), {
            _token: csrf_token,
        });
        onClose();
        return redirect("/");
    };
    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
                size={"xs"}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        {auth.user
                            ? `${auth.user.name} さんのメニュー`
                            : "未ログインユーザー"}
                    </DrawerHeader>
                    <DrawerBody>
                        <VStack>
                            {auth.user ? (
                                <Box display={"block"}>
                                    <VStack>
                                        <Link
                                            href={route("dashboard")}
                                            _hover={{ color: "gray.500" }}
                                            p={2}
                                        >
                                            マイページ
                                        </Link>
                                        <Link
                                            href={route("shop.create")}
                                            _hover={{ color: "gray.500" }}
                                            p={2}
                                        >
                                            店舗の登録
                                        </Link>
                                        <Text
                                            onClick={handleLogout}
                                            cursor={"pointer"}
                                            p={2}
                                        >
                                            ログアウト
                                        </Text>
                                    </VStack>
                                </Box>
                            ) : (
                                <>
                                    <Link href={route("login")}>ログイン</Link>
                                    <Link href={route("register")}>
                                        新規登録
                                    </Link>
                                </>
                            )}
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

            <Flex
                direction="column"
                minHeight="100vh" // 画面の高さいっぱいに広がる
            >
                {/* ヘッダー */}
                <Box bg={"teal.700"} flexShrink={0}>
                    <HStack
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        py={{ base: 0, md: 3 }}
                        px={{ base: 1, md: 2 }}
                    >
                        <Heading
                            as="h1"
                            size={{ base: "xs", md: "md" }}
                            color={"white"}
                            pl={2}
                        >
                            <Link
                                href={route("shop.index")}
                                _hover={{ color: "gray.500" }}
                            >
                                {import.meta.env.VITE_APP_NAME}
                            </Link>
                        </Heading>
                        {/* PC表示 */}
                        <HStack
                            display={{ base: "none", md: "flex" }}
                            color={"white"}
                            fontWeight={"bold"}
                        >
                            {auth.user ? (
                                <Box pr={2}>
                                    {/* <Text
                                            onClick={onOpen}
                                            cursor={"pointer"}
                                            ref={btnRef}
                                            display={"flex"}
                                            alignItems={"center"}
                                        >
                                            <SettingsIcon mx={1} />
                                            {auth.user.name}さん
                                        </Text> */}
                                    <Avatar
                                        onClick={onOpen}
                                        cursor={"pointer"}
                                        ref={btnRef}
                                        src={auth.user.avatar_url}
                                        name={auth.user.name}
                                        size="sm"
                                        // border="2px"
                                        borderColor="gray.200"
                                        color="black"
                                        backgroundColor={"white"}
                                        fallback={null} // テキスト表示を防止
                                    />
                                </Box>
                            ) : (
                                <>
                                    <Box>
                                        <Link href={route("login")}>
                                            <Button colorScheme="whiteAlpha">
                                                ログイン
                                            </Button>
                                        </Link>
                                    </Box>
                                    <Box>
                                        <Link href={route("register")}>
                                            <Button colorScheme="blackAlpha">
                                                新規登録
                                            </Button>
                                        </Link>
                                    </Box>
                                </>
                            )}
                        </HStack>
                        {/* SP表示 */}
                        <Box
                            display={{ base: "block", md: "none" }}
                            px={{ base: "1", md: "none" }}
                            py={{ base: "2", md: "none" }}
                        >
                            <HamburgerIcon
                                ref={btnRef}
                                color={"white"}
                                onClick={onOpen}
                                cursor={"pointer"}
                                fontSize={"xl"}
                            />
                        </Box>
                    </HStack>
                </Box>

                {/* メインコンテンツ */}
                <Box flexGrow={1}>{children}</Box>

                {/* フッター */}
                <Box>
                    <Box
                        bg={"teal.700"}
                        color={"white"}
                        fontWeight={"bold"}
                        textAlign={"center"}
                        py={{ base: 2, md: 3 }}
                        flexShrink={0} // フッターを固定
                    >
                        <Text fontSize={{ base: 13, md: 16 }}>
                            &copy; 2025 {import.meta.env.VITE_APP_NAME}
                        </Text>
                    </Box>
                </Box>
            </Flex>
        </>
    );
};
export default MainLayout;
