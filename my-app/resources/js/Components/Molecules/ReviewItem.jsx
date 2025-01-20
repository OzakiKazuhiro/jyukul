import React from "react";
import StarRating from "../Atoms/StarRating";
import UserName from "../Atoms/UserName";
import { usePage } from "@inertiajs/react";
import { Box, Text, Link, Button, HStack, Flex } from "@chakra-ui/react";
const ReviewItem = ({ review }) => {
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
            <Flex alignItems="center" justifyContent={"space-between"} mb={4}>
                <Box>
                    {/* アクセサの average_rating を表示 */}
                    {review.average_rating ? (
                        <Text fontWeight="bold">
                            総合レビュー：{review.average_rating} / 5.0
                        </Text>
                    ) : (
                        <Text color="gray.500">総合レビュー：評価なし</Text>
                    )}
                </Box>

                <UserName
                    name={review.user.name}
                    anonymous={review.anonymous}
                />
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
                        <Button colorScheme={"blue"} fontSize={"14"}>
                            編集
                        </Button>
                    </Link>
                )}
            </Box>
        </Box>
    );
};
export default ReviewItem;
