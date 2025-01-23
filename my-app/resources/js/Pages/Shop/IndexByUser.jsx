import React from "react";
import MainLayout from "@/Layouts/MainLayout";
import {
    Box,
    Heading,
    VStack,
    HStack,
    Image,
    Link,
    Text,
} from "@chakra-ui/react";

const IndexByUser = (props) => {
    console.log(props);
    return (
        <Box>
            <Box p={4}>
                {props.shops.length > 0 ? (
                    <Box>
                        <Heading m={4} fontSize={{ base: "24", md: "36" }}>
                            {props.user.name}さんが登録した学習塾一覧
                        </Heading>
                        <VStack spacing={4} align="stretch">
                            {props.shops.map((shop) => (
                                <Link
                                    href={`/shop/${shop.id}`}
                                    key={shop.id}
                                    _hover={{ color: "gray.500" }}
                                >
                                    <Box
                                        key={shop.id}
                                        p={4}
                                        borderWidth={"1px"}
                                        borderRadius={"lg"}
                                        overflow={"hidden"}
                                        boxShadow={"lg"}
                                    >
                                        <HStack spacing={4}>
                                            <Image
                                                boxSize="100px"
                                                objectFit="cover"
                                                src={`/${shop.shop_images[0].file_path}`}
                                                alt={shop.name}
                                            />
                                            <VStack align={"start"}>
                                                <Heading as="h3" size="md">
                                                    {shop.name}
                                                </Heading>
                                                <Text>{shop.description}</Text>
                                            </VStack>
                                        </HStack>
                                    </Box>
                                </Link>
                            ))}
                        </VStack>
                    </Box>
                ) : (
                    <Heading fontSize={{ base: "24", md: "36" }}>
                        関連した店舗はまだありません。
                    </Heading>
                )}
            </Box>
        </Box>
    );
};
IndexByUser.layout = (page) => (
    <MainLayout children={page} title="ユーザーの関連した店舗" />
);
export default IndexByUser;
