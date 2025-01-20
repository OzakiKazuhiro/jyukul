import React from "react";
import { Link as InertiaLink, usePage, router } from "@inertiajs/react";
import {
    Box,
    Heading,
    HStack,
    Link,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
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
                    <DrawerHeader> {auth.user.name}さんのメニュー</DrawerHeader>
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

                                        {/* Inertiaを使うパターン */}
                                        {/* <InertiaLink
                                            href={route("logout")}
                                            method="post"
                                            onClick={onClose}
                                            _hover={{ color: "gray.500" }}
                                        >
                                            ログアウト
                                        </InertiaLink> */}
                                        {/* handleLogoutを使うパターン */}
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
            <header>
                <Box bg={"teal.700"}>
                    <HStack
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        py={{ base: 0, md: 3 }}
                        px={{ base: 1, md: 2 }}
                    >
                        {/* ヘッダー */}
                        <Heading
                            as="h1"
                            size={{ base: "xs", md: "md" }}
                            color={"white"}
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
                                <Box>
                                    <Text
                                        onClick={onOpen}
                                        cursor={"pointer"}
                                        ref={btnRef}
                                        display={"flex"}
                                        alignItems={"center"}
                                    >
                                        {auth.user.name}さん
                                        <SettingsIcon mx={1} />
                                    </Text>
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
                            {/* <Menu>
                                <MenuButton
                                    as={IconButton}
                                    aria-label="Options"
                                    icon={<HamburgerIcon />}
                                    variant="outline"
                                    colorScheme="white"
                                />
                                <MenuList>
                                    <MenuItem icon={<SettingsIcon />}>
                                        マイページ
                                    </MenuItem>
                                    <MenuItem>店舗の登録</MenuItem>
                                </MenuList>
                            </Menu> */}
                        </Box>
                    </HStack>
                </Box>
            </header>
            <Box>{children}</Box>
            {/* フッター */}
            <Box>
                <Box
                    bg={"teal.700"}
                    color={"white"}
                    fontWeight={"bold"}
                    textAlign={"center"}
                    py={{ base: 2, md: 3 }}
                >
                    <Text fontSize={{ base: 13, md: 16 }}>
                        &copy; 2025 {import.meta.env.VITE_APP_NAME}
                    </Text>
                </Box>
            </Box>
        </>
    );
};
export default MainLayout;
