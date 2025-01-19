import React from "react";
import { HStack } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { FaStar, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating, propsColor }) => {
    return (
        <HStack>
            {Array(5)
                .fill("")
                .map((_, i) =>
                    // <StarIcon
                    //     key={i}
                    //     color={i < rating ? "yellow.500" : "gray.300"}
                    // />
                    i < rating ? (
                        <FaStar
                            key={i}
                            style={{ color: propsColor, fontSize: "1.5em" }}
                            // style={{ color: "#f7a10d", fontSize: "1.5em" }}
                        />
                    ) : (
                        <FaRegStar
                            key={i}
                            style={{ color: "gray", fontSize: "1.5em" }}
                        />
                    )
                )}
        </HStack>
    );
};
export default StarRating;
