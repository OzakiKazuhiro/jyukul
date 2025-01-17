import React from "react";
import { Text } from "@chakra-ui/react";
const UserName = ({ name, anonymous }) => {
    return (
        <Text textAlign={"right"} fontSize={"sm"}>
            {anonymous ? "匿名" : name}
        </Text>
    );
};
export default UserName;
