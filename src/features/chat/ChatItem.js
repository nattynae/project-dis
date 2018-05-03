import React from "react";
import EachChat from "./EachChat";
import GroupMember from "./GroupMember";

export default props => (
  <div>
    <EachChat groupName="Group Name" />
    <GroupMember />
  </div>
);
