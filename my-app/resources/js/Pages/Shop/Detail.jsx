// import React, { useEffect } from "react";
// import MainLayout from "@/Layouts/MainLayout";
// import { SmallAddIcon, EditIcon } from "@chakra-ui/icons";
// import {
//     Box,
//     Heading,
//     Image,
//     Text,
//     Link,
//     Button,
//     useToast,
//     HStack,
//     Table,
//     Thead,
//     Tbody,
//     Tfoot,
//     Tr,
//     Th,
//     Td,
//     TableCaption,
//     TableContainer,
// } from "@chakra-ui/react";
// import ReviewList from "@/Components/Organisms/ReviewList";
// import { Splide, SplideSlide } from "@splidejs/react-splide";
// import "@splidejs/splide/dist/css/themes/splide-default.min.css";
// const Detail = (props) => {
//     console.log(props.reviews);
//     const toast = useToast();

//     useEffect(() => {
//         if (props.status === "review-created") {
//             toast({
//                 position: "top",
//                 title: "レビュー投稿成功",
//                 description: "レビューの投稿が完了しました。",
//                 status: "success",
//                 duration: 9000,
//                 isClosable: true,
//             });
//         } else if (props.status === "review-deleted") {
//             toast({
//                 position: "top",
//                 title: "レビュー削除成功",
//                 description: "レビューの削除が完了しました。",
//                 status: "error",
//                 duration: 9000,
//                 isClosable: true,
//             });
//         } else if (props.status === "review-updated") {
//             toast({
//                 position: "top",
//                 title: "レビュー更新成功",
//                 description: "レビューの更新が完了しました。",
//                 status: "info",
//                 duration: 9000,
//                 isClosable: true,
//             });
//         } else if (props.status === "shop-updated") {
//             toast({
//                 position: "top",
//                 title: "店舗の更新成功",
//                 description: "店舗の更新が完了しました。",
//                 status: "info",
//                 duration: 9000,
//                 isClosable: true,
//             });
//         }
//     }, [props.status]);

//     const options = {
//         type: "loop",
//         gap: "1rem",
//         autoplay: true,
//         pauseOnHover: false,
//         resetProgress: false,
//         height: "15rem",
//     };

//     return (
//         <Box p={4}>
//             <HStack
//                 spacing={4}
//                 p={4}
//                 mb={2}
//                 justifyContent="center"
//                 alignItems="center"
//             >
//                 <Heading as="h2" size={"xl"}>
//                     {props.shop.name}
//                 </Heading>
//                 <Link href={route("shop.edit", { id: props.shop.id })}>
//                     <Button p={2} borderRadius={10} bg={"gray.200"}>
//                         <EditIcon />
//                     </Button>
//                 </Link>
//             </HStack>

//             {props.shop.shop_images.length > 0 ? (
//                 <Box
//                     mx="auto"
//                     mb={4}
//                     bgColor={"gray.100"}
//                     w={{ base: "100%", sm: "400px", md: "600px", lg: "800px" }}
//                 >
//                     <Splide options={options}>
//                         {props.shop.shop_images.map((image, index) => (
//                             <SplideSlide key={index}>
//                                 <Image
//                                     key={image.id}
//                                     boxSize="100%"
//                                     objectFit="contain"
//                                     src={
//                                         import.meta.env.VITE_APP_URL +
//                                         "/" +
//                                         image.file_path
//                                     }
//                                     alt={image.file_name}
//                                     mb={4}
//                                 />
//                             </SplideSlide>
//                         ))}
//                         <div className="splide__progress">
//                             <div className="splide__progress__bar" />
//                         </div>

//                         <button className="splide__toggle">
//                             <span className="splide__toggle__play">Play</span>
//                             <span className="splide__toggle__pause">Pause</span>
//                         </button>
//                     </Splide>
//                 </Box>
//             ) : (
//                 <Image
//                     boxSize="300px"
//                     objectFit="contain"
//                     src="https://via.placeholder.com/300"
//                     alt={props.shop.name}
//                     mb={4}
//                 />
//             )}

//             {/* テーブル */}
//             <TableContainer>
//                 <Table bg="gray.50" variant="simple">
//                     <TableCaption placement="top">塾情報</TableCaption>
//                     <Tbody>
//                         <Tr>
//                             <Td>作成者</Td>
//                             <Td>
//                                 {props.createdUser ? (
//                                     <Text fontSize={{ base: 12, md: 14 }}>
//                                         作成者:{" "}
//                                         <Link
//                                             color={"blue.400"}
//                                             href={route(`shop.indexByUser`, {
//                                                 userId: props.createdUser.id,
//                                             })}
//                                         >
//                                             {props.createdUser.name}さん
//                                         </Link>
//                                     </Text>
//                                 ) : (
//                                     <Text fontSize={{ base: 12, md: 14 }}>
//                                         不明
//                                     </Text>
//                                 )}
//                             </Td>
//                         </Tr>
//                         <Tr>
//                             <Td>更新者</Td>
//                             <Td>
//                                 {props.updatedUser ? (
//                                     <Text fontSize={{ base: 12, md: 14 }}>
//                                         <Link
//                                             color={"blue.400"}
//                                             href={route("shop.indexByUser", {
//                                                 userId: props.updatedUser.id,
//                                             })}
//                                         >
//                                             {props.updatedUser.name}さん
//                                         </Link>
//                                     </Text>
//                                 ) : (
//                                     <Text fontSize={{ base: 12, md: 14 }}>
//                                         {" "}
//                                         更新者: なし{" "}
//                                     </Text>
//                                 )}
//                             </Td>
//                         </Tr>
//                         <Tr>
//                             <Td>情報</Td>
//                             <Td>{props.shop.description}</Td>
//                         </Tr>
//                         <Tr>
//                             <Td>場所</Td>
//                             <Td>{props.shop.location}</Td>
//                         </Tr>
//                     </Tbody>
//                 </Table>
//             </TableContainer>

//             {/* レビュー */}
//             <Box mt={8}>
//                 <Heading as="h3" size={"lg"} mb={1}>
//                     レビュー
//                 </Heading>
//                 <Box>
//                     <Link href={`/review/create/shop/${props.shop.id}`}>
//                         <Button my={4}>
//                             <SmallAddIcon />
//                             レビューを書く
//                         </Button>
//                     </Link>
//                 </Box>
//                 <Box>
//                     {props.reviews.length > 0 && (
//                         <Box mb={2}>({props.reviews.length})件のレビュー</Box>
//                     )}
//                 </Box>
//                 <Box>
//                     {props.reviews.length === 0 && (
//                         <Text>レビューはまだありません</Text>
//                     )}
//                     <ReviewList reviews={props.reviews} />
//                 </Box>
//             </Box>
//         </Box>
//     );
// };
// Detail.layout = (page) => <MainLayout children={page} title="ショップ詳細" />;

// export default Detail;

import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import MainLayout from "@/Layouts/MainLayout";
import { SmallAddIcon, EditIcon } from "@chakra-ui/icons";
import {
    Box,
    Heading,
    Image,
    Text,
    Link,
    Button,
    useToast,
    HStack,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    SimpleGrid,
} from "@chakra-ui/react";
import ReviewList from "@/Components/Organisms/ReviewList";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import Map from "@/Components/Map"; // 地図コンポーネントをインポート
import axios from "axios";

const Detail = (props, { response }) => {
    // console.log(props.reviews);
    const toast = useToast();
    const [coordinates, setCoordinates] = useState(null);

    console.log(coordinates);
    console.log(props.shop.location);
    console.log(response);

    // デバッグ用のログ
    useEffect(() => {
        console.log("Shop Location:", props.shop.location);
    }, [props.shop.location]);

    // ジオコーディング処理用Effect
    useEffect(() => {
        const fetchCoordinates = async () => {
            try {
                console.log("Fetching coordinates for:", props.shop.location);

                const response = await axios.get("/api/geocode", {
                    params: { address: props.shop.location },
                });

                console.log("API Response:", response.data);

                if (response.data?.[0]?.geometry?.coordinates) {
                    const [lng, lat] = response.data[0].geometry.coordinates;
                    console.log("Setting coordinates:", { lat, lng });
                    setCoordinates({ lat, lng });
                }
            } catch (error) {
                console.error("ジオコーディングエラー:", error);
            }
        };

        if (props.shop.location) {
            fetchCoordinates();
        }
    }, [props.shop.location]); // locationが変更されたときに再実行

    useEffect(() => {
        if (props.status === "review-created") {
            toast({
                position: "top",
                title: "レビュー投稿成功",
                description: "レビューの投稿が完了しました。",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
        } else if (props.status === "review-deleted") {
            toast({
                position: "top",
                title: "レビュー削除成功",
                description: "レビューの削除が完了しました。",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        } else if (props.status === "review-updated") {
            toast({
                position: "top",
                title: "レビュー更新成功",
                description: "レビューの更新が完了しました。",
                status: "info",
                duration: 9000,
                isClosable: true,
            });
        } else if (props.status === "shop-updated") {
            toast({
                position: "top",
                title: "店舗の更新成功",
                description: "店舗の更新が完了しました。",
                status: "info",
                duration: 9000,
                isClosable: true,
            });
        }
    }, [props.status]);

    const options = {
        type: "loop",
        gap: "1rem",
        autoplay: true,
        pauseOnHover: false,
        resetProgress: false,
        height: "15rem",
    };

    return (
        <Box p={4}>
            <HStack
                spacing={4}
                p={4}
                mb={2}
                justifyContent="center"
                alignItems="center"
            >
                <Heading as="h2" size={"xl"}>
                    {props.shop.name}
                </Heading>
                <Link href={route("shop.edit", { id: props.shop.id })}>
                    <Button p={2} borderRadius={10} bg={"gray.200"}>
                        <EditIcon />
                    </Button>
                </Link>
            </HStack>

            {props.shop.shop_images.length > 0 ? (
                <Box
                    mx="auto"
                    mb={4}
                    bgColor={"gray.100"}
                    w={{ base: "100%", sm: "400px", md: "600px", lg: "800px" }}
                >
                    <Splide options={options}>
                        {props.shop.shop_images.map((image, index) => (
                            <SplideSlide key={index}>
                                <Image
                                    key={image.id}
                                    boxSize="100%"
                                    objectFit="contain"
                                    src={"/" + image.file_path}
                                    alt={image.file_name}
                                    mb={4}
                                />
                            </SplideSlide>
                        ))}
                        <div className="splide__progress">
                            <div className="splide__progress__bar" />
                        </div>

                        <button className="splide__toggle">
                            <span className="splide__toggle__play">Play</span>
                            <span className="splide__toggle__pause">Pause</span>
                        </button>
                    </Splide>
                </Box>
            ) : (
                <Image
                    boxSize="300px"
                    objectFit="contain"
                    src="https://via.placeholder.com/300"
                    alt={props.shop.name}
                    mb={4}
                />
            )}

            {/* テーブル */}
            <TableContainer
                mx="auto"
                w={{ base: "100%", sm: "400px", md: "600px", lg: "800px" }}
            >
                <Table bg="gray.50" variant="simple">
                    <TableCaption placement="top">塾情報</TableCaption>
                    <Tbody>
                        <Tr>
                            <Td>作成者です</Td>
                            <Td>
                                {props.createdUser ? (
                                    <Text fontSize={{ base: 12, md: 14 }}>
                                        作成者:{" "}
                                        <Link
                                            color={"blue.400"}
                                            href={route(`shop.indexByUser`, {
                                                userId: props.createdUser.id,
                                            })}
                                        >
                                            {props.createdUser.name}さん
                                        </Link>
                                    </Text>
                                ) : (
                                    <Text fontSize={{ base: 12, md: 14 }}>
                                        不明
                                    </Text>
                                )}
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>更新者</Td>
                            <Td>
                                {props.updatedUser ? (
                                    <Text fontSize={{ base: 12, md: 14 }}>
                                        <Link
                                            color={"blue.400"}
                                            href={route("shop.indexByUser", {
                                                userId: props.updatedUser.id,
                                            })}
                                        >
                                            {props.updatedUser.name}さん
                                        </Link>
                                    </Text>
                                ) : (
                                    <Text fontSize={{ base: 12, md: 14 }}>
                                        {" "}
                                        更新者: なし{" "}
                                    </Text>
                                )}
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>情報</Td>
                            <Td>{props.shop.description}</Td>
                        </Tr>
                        <Tr>
                            <Td>場所</Td>
                            <Td>{props.shop.location}</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>

            {/* 地図 */}
            <Box
                mx="auto"
                mt={10}
                mb={4}
                w={{ base: "100%", sm: "400px", md: "600px", lg: "800px" }}
            >
                <Heading as="h3" size={"lg"} mb={1}>
                    地図
                </Heading>
                {/* <Map location={place} /> */}
                {/* 修正後の地図コンポーネント */}
                <Box>
                    {coordinates ? (
                        <Map
                            location={{
                                lat: coordinates.lat,
                                lng: coordinates.lng,
                                name: props.shop.name,
                                address: props.shop.location,
                            }}
                        />
                    ) : (
                        <Text>登録した場所が存在しません</Text>
                    )}
                </Box>
            </Box>

            {/* レビュー */}
            <Box
                mx="auto"
                mt={8}
                w={{ base: "100%", sm: "400px", md: "600px", lg: "800px" }}
            >
                <Heading as="h3" size={"lg"} mb={1}>
                    レビュー
                </Heading>
                <Box>
                    <Link href={`/review/create/shop/${props.shop.id}`}>
                        <Button my={4}>
                            <SmallAddIcon />
                            レビューを書く
                        </Button>
                    </Link>
                </Box>
                <Box>
                    {props.reviews.length > 0 && (
                        <Box mb={2}>({props.reviews.length})件のレビュー</Box>
                    )}
                </Box>
                <Box>
                    {props.reviews.length === 0 && (
                        <Text>レビューはまだありません</Text>
                    )}
                    <SimpleGrid
                        columns={{ base: 1, md: 2 }}
                        spacing={4}
                        w="full"
                    >
                        <ReviewList
                            spacing={4}
                            align={"stretch"}
                            reviews={props.reviews}
                        />
                    </SimpleGrid>
                    {/* <ReviewList reviews={props.reviews} /> */}
                </Box>
            </Box>
        </Box>
    );
};
Detail.layout = (page) => <MainLayout children={page} title="ショップ詳細" />;

export default Detail;
