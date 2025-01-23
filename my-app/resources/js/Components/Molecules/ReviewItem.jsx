import React from "react";
import StarRating from "../Atoms/StarRating";
import UserName from "../Atoms/UserName";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { usePage } from "@inertiajs/react";
import {
    Box,
    Text,
    Link,
    Button,
    HStack,
    Flex,
    WrapItem,
    Avatar,
    VStack,
} from "@chakra-ui/react";

const AverageRatingStarDisplay = ({ averageRating }) => {
    const fullStars = Math.floor(averageRating); // 満点の星の数
    const hasHalfStar = averageRating % 1 !== 0; // 小数第1位が0でないかどうか

    return (
        <HStack spacing={1}>
            {Array(5)
                .fill("")
                .map((_, i) => {
                    if (i < fullStars) {
                        // 満点の星
                        return <FaStar key={i} color="gold" size="25px" />;
                    } else if (hasHalfStar && i === fullStars) {
                        // 半分の星
                        return <FaStarHalf key={i} color="gold" size="25px" />;
                    } else {
                        // 空の星
                        return <FaStar key={i} color="gray" size="25px" />;
                    }
                })}
        </HStack>
    );
};

const ReviewItem = ({ review }) => {
    console.log(review);
    const { auth } = usePage().props;

    return (
        <Box
            key={review.id}
            p={4}
            borderWidth={"1px"}
            borderRadius={"lg"}
            overflow={"hidden"}
            boxShadow={"lg"}
            mb={4}
        >
            <Flex alignItems={"center"} justifyContent={"space-between"} mb={2}>
                <Box>
                    {review.shop?.name && (
                        <Text fontWeight="bold" fontSize="lg" mb={2}>
                            {review.shop.name}
                        </Text>
                    )}
                    {review.average_rating ? (
                        <VStack align="start">
                            <AverageRatingStarDisplay
                                averageRating={review.average_rating}
                            />
                            <Text fontWeight="bold" fontSize="lg">
                                総合評価：{review.average_rating} / 5.0
                            </Text>
                        </VStack>
                    ) : (
                        <Text color="gray.500">総合レビュー：評価なし</Text>
                    )}
                </Box>
                <VStack>
                    <WrapItem>
                        <Avatar
                            name={review.anonymous ? "?" : review.user.name}
                            src={
                                review.anonymous ? null : review.user.avatar_url
                            }
                            border="2px"
                            borderColor="gray.200"
                            bg={review.anonymous ? "gray.400" : undefined} // 匿名時の背景色
                        />
                    </WrapItem>
                    <UserName
                        name={review.user.name}
                        anonymous={review.anonymous}
                    />
                </VStack>
            </Flex>

            <HStack>
                <Text style={{ whiteSpace: "pre-wrap" }} w={24}>
                    教え方
                </Text>
                <StarRating
                    rating={review.teaching_rating}
                    propsColor={"red"}
                />
            </HStack>

            <HStack>
                <Text style={{ whiteSpace: "pre-wrap" }} w={24}>
                    テスト対策
                </Text>
                <StarRating rating={review.study_rating} propsColor={"blue"} />
            </HStack>

            <HStack>
                <Text style={{ whiteSpace: "pre-wrap" }} w={24}>
                    自習室
                </Text>
                <StarRating
                    rating={review.facility_rating}
                    propsColor={"green"}
                />
            </HStack>
            <HStack mb={2}>
                <Text style={{ whiteSpace: "pre-wrap" }} w={24}>
                    料金
                </Text>
                <StarRating rating={review.cost_rating} propsColor="orange" />
            </HStack>

            <HStack mb={2}>
                <Text style={{ whiteSpace: "pre-wrap" }} w={24}>
                    コメント：
                </Text>
                <Text style={{ whiteSpace: "pre-wrap" }}>{review.comment}</Text>
            </HStack>

            <Box mt={3} w={"100%"} display={"flex"} justifyContent={"flex-end"}>
                {auth.user && auth.user.id === review.user_id && (
                    <Link href={`/review/edit/${review.id}`}>
                        <Button colorScheme={"teal"} fontSize={"14"}>
                            編集
                        </Button>
                    </Link>
                )}
            </Box>
        </Box>
    );
};
export default ReviewItem;
