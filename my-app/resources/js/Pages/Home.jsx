import {
    Box,
    Heading,
    VStack,
    HStack,
    Image,
    Text,
    Link,
    useToast,
    Input,
    Button,
    Spinner,
    WrapItem,
    SimpleGrid,
    Select,
} from "@chakra-ui/react";
import MainLayout from "../Layouts/MainLayout";
import React, { useState } from "react";
import { router } from "@inertiajs/react";
import ReviewList from "@/Components/Organisms/ReviewList";

const Home = (props) => {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [sortBy, setSortBy] = useState(""); // 並べ替えの状態を管理
    const toast = useToast();

    if (props.status === "shop-created") {
        toast({
            position: "top",
            title: "店舗登録成功",
            description: "店舗の登録が完了しました。",
            status: "success",
            duration: 9000,
            isClosable: true,
        });
    } else if (props.status === "shop-deleted") {
        toast({
            position: "top",
            title: "店舗削除成功",
            description: "店舗の削除が完了しました。",
            status: "error",
            duration: 9000,
            isClosable: true,
        });
    }

    const handlePageChange = (url) => {
        router.get(url);
    };

    const getButtonLabel = (label) => {
        if (label.includes("&raquo;")) return "次へ";
        if (label.includes("&laquo;")) return "前へ";
        return label;
    };

    const handleSearch = (e) => {
        setLoading(true);
        e.preventDefault();
        const newSearch = document.getElementById("search").value;
        setSearch(newSearch);

        setTimeout(() => {
            setLoading(false);
            router.get(route("shop.index"), { search: newSearch, sortBy }); // sortByを追加
        }, 500);
    };

    const handleSortChange = (e) => {
        const selectedSort = e.target.value;
        setSortBy(selectedSort);
        router.get(route("shop.index"), { search, sortBy: selectedSort }); // 並べ替えを適用
    };

    return (
        <>
            <Box p={4}>
                <Heading
                    fontSize={{ base: "24px", md: "40px", lg: "56px" }}
                    mb={2}
                    textAlign={"center"}
                >
                    学習塾一覧だ
                </Heading>
                <HStack spacing={4} mb={4}>
                    <Input
                        name="search"
                        id="search"
                        placeholder="検索..."
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSearch(e);
                            }
                        }}
                    />
                    <WrapItem>
                        <Button onClick={handleSearch} colorScheme="teal">
                            検索
                        </Button>
                    </WrapItem>
                </HStack>
                {/* 並べ替え用のドロップダウンを追加 */}
                <Select
                    placeholder="並べ替え"
                    value={sortBy}
                    onChange={handleSortChange}
                    mb={4}
                    w="200px"
                    sx={{
                        paddingTop: "0px",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <option value="rating_high">総合評価平均の高い順</option>
                    <option value="teaching_rating_high">
                        講師の教え方の評価が高い順
                    </option>
                    <option value="study_rating_high">
                        定期テスト対策の充実度が高い順
                    </option>
                    <option value="facility_rating_high">
                        自習室の環境が良い順
                    </option>
                    <option value="cost_rating_high">料金対効果が高い順</option>
                    <option value="review_count">レビュー数が多い順</option>
                </Select>
                {loading && (
                    <Box
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
                        <Spinner size={"xl"} />
                    </Box>
                )}

                <VStack spacing={4} align="stretch">
                    {/* マップされたショップのリスト */}
                    <SimpleGrid
                        columns={{ base: 1, md: 2 }}
                        spacing={4}
                        w="full"
                    >
                        {props.shops.data.map((shop) => (
                            <Link
                                href={`/shop/${shop.id}`}
                                key={shop.id}
                                _hover={{ color: "gray.500" }}
                            >
                                <Box
                                    key={shop.id}
                                    p={4}
                                    borderWidth="1px"
                                    borderRadius="lg"
                                    overflow="hidden"
                                    boxShadow="lg"
                                >
                                    <HStack spacing={4} alignItems="flex-start">
                                        {shop.shop_images.length > 0 ? (
                                            <Image
                                                boxSize="100px"
                                                mt={1}
                                                objectFit="cover"
                                                src={
                                                    shop.shop_images[0]
                                                        .file_path
                                                }
                                                alt={shop.name}
                                            />
                                        ) : (
                                            <Image
                                                boxSize="100px"
                                                objectFit="cover"
                                                src="/images/school_default.jpeg"
                                                alt={shop.name}
                                            />
                                        )}

                                        <VStack align="start">
                                            <Heading as="h3" size="md">
                                                {shop.name}
                                            </Heading>
                                            <Text>
                                                {shop.description.length > 20
                                                    ? `${shop.description.slice(
                                                          0,
                                                          20
                                                      )}…`
                                                    : shop.description}
                                            </Text>
                                            <Text>
                                                レビュー件数: (
                                                {shop.reviews_count}件)
                                            </Text>
                                            <Text>
                                                総合評価平均:{" "}
                                                {shop.average_rating ||
                                                    "評価なし"}
                                            </Text>
                                            <Box>
                                                <Text fontSize="sm">
                                                    教え方:{" "}
                                                    {shop.average_teaching_rating ||
                                                        "評価なし"}
                                                </Text>
                                                <Text fontSize="sm">
                                                    テスト対策:{" "}
                                                    {shop.average_study_rating ||
                                                        "評価なし"}
                                                </Text>
                                                <Text fontSize="sm">
                                                    自習室:{" "}
                                                    {shop.average_facility_rating ||
                                                        "評価なし"}
                                                </Text>
                                                <Text fontSize="sm">
                                                    料金:{" "}
                                                    {shop.average_cost_rating ||
                                                        "評価なし"}
                                                </Text>
                                            </Box>
                                        </VStack>
                                    </HStack>
                                </Box>
                            </Link>
                        ))}
                    </SimpleGrid>
                    {/* ページネーション部分 */}
                    <HStack
                        pt={4}
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
                        {props.shops.links.map((link, index) => (
                            <Button
                                key={index}
                                onClick={() => handlePageChange(link.url)}
                                colorScheme={link.active ? "teal" : "gray"}
                                isDisabled={!link.url}
                            >
                                {getButtonLabel(link.label)}
                            </Button>
                        ))}
                    </HStack>
                </VStack>
                <Heading
                    as="h2"
                    fontSize={{ base: "24px", md: "40px", lg: "56px" }}
                    mt={8}
                    mb={4}
                    textAlign={"center"}
                >
                    新着レビュー
                </Heading>
                <SimpleGrid
                    columns={{ base: 1, md: 2, lg: 3 }}
                    spacing={4}
                    w="full"
                >
                    <ReviewList
                        spacing={4}
                        align={"stretch"}
                        reviews={props.newReviews}
                    />
                </SimpleGrid>
            </Box>
        </>
    );
};
Home.layout = (page) => <MainLayout children={page} title="ホームの画面" />;
export default Home;
