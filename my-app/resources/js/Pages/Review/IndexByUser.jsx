import React from "react";
import MainLayout from "@/Layouts/MainLayout";
import ReviewList from "@/Components/Organisms/ReviewList";
import { Box, Heading } from "@chakra-ui/react";

const IndexByUser = (props) => {
    return (
        <>
            <Box p={4}>
                {props.reviews.length > 0 ? (
                    <Box>
                        <Heading m={4} fontSize={{ base: "24", md: "36" }}>
                            {props.user.name}さんのレビュー一覧
                        </Heading>
                        <ReviewList reviews={props.reviews} />
                    </Box>
                ) : (
                    <Heading fontSize={{ base: "24", md: "36" }}>
                        レビューはまだありません。
                    </Heading>
                )}
            </Box>
        </>
    );
};

IndexByUser.layout = (page) => (
    <MainLayout children={page} title="ユーザーのレビュー一覧" />
);
export default IndexByUser;
