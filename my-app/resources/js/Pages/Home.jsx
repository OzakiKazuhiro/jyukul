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
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import MainLayout from "../Layouts/MainLayout";
import React,{useState} from "react";
import {router} from "@inertiajs/react";
import ReviewList from "@/Components/Organisms/ReviewList";

const Home = (props) => {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    if(props.status === "shop-created"){
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
        if(label.includes("previous")) return "前へ";
        if(label.includes("next")) return "次へ";
        return label;
    };

    const handleSearch = (e) => {
        setLoading(true);
        e.preventDefault();
        const newSearch =
        document.getElementById("search").value;
        setSearch(newSearch);

        setTimeout(() => {
            //検索処理
            setLoading(false);
            router.get(route("shop.index"), { search: newSearch });
        }, 500);
    }
        
    return (
        <>
            <Box p={4}>
                <Heading
                    fontSize={{ base: "24px", md: "40px", lg: "56px" }}
                    mb={2}
                >
                    ショップ一覧
                </Heading>
                <VStack spacing={4} mb={4}>
                    <Input
                        name="search"
                        id="search"
                        placeholder="検索..."
                    ></Input>
                    <Button onClick={handleSearch}>検索</Button>
                </VStack>
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
                    {props.shops.data.map((shop) => (
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
                                    {shop.shop_images.length > 0 ? (
                                        <Image
                                            boxSize="100px"
                                            objectFit="cover"
                                            src={shop.shop_images[0].file_path}
                                            alt={shop.name}
                                        />
                                    ) : (
                                        <Image
                                            boxSize="100px"
                                            objectFit="cover"
                                            src="https://via.placeholder.com/100"
                                            alt={shop.name}
                                        />
                                    )}

                                    <VStack align={"start"}>
                                        <Heading as="h3" size="md">
                                            {shop.name}
                                        </Heading>
                                        <Text>{shop.description}</Text>
                                        <Text>
                                            レビュー平均:{" "}
                                            {shop.reviews_avg_rating}(
                                            {shop.reviews_count}件)
                                        </Text>
                                    </VStack>
                                </HStack>
                            </Box>
                        </Link>
                    ))}
                    <HStack justifyContent={"center"} alignItems={"center"}>
                        {props.shops.links.map((link, index) => (
                            <Button
                                key={index}
                                onClick={() => handlePageChange(link.url)}
                                colorScheme={link.active ? "blue" : "gray"}
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
                    mb={2}
                >
                    新着レビュー
                </Heading>
                <VStack spacing={4} align={"stretch"}>
                    <ReviewList reviews={props.newReviews} />
                </VStack>
            </Box>
        </>
    );
};
Home.layout = (page) => <MainLayout children={page} title="ホームの画面" />; 
export default Home;
