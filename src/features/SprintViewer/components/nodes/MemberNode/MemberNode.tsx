import { Avatar, Card, CardContent, Typography } from "@mui/material";
import { Handle, Position } from "reactflow";
import { useGetSprintQuery } from "../../../../../app/store/services/sprint";

const userNodeStyle = {
  width: "200px",
  height: "100%",
  color: "black",
};

export const MemberNode = (props: any) => {
  const { data, sprintId, id } = props;

  const { isReviewing } = useGetSprintQuery(sprintId, {
    selectFromResult: (res: any) => ({
      isReviewing: !!res.data.sprint.issues.find(
        (issue: any) => issue.reviewerId?.toString() === id
      ),
    }),
  });

  return (
    <div style={userNodeStyle}>
      <Handle type="target" position={Position.Top} />

      <Card>
        <CardContent>
          <Avatar
            alt={data.label}
            src={require("./images/davidCottrell.jpg")}
            sx={{ margin: "0 auto" }}
          />
          <Typography
            variant="h5"
            component="div"
            align={"center"}
            sx={{ padding: "10px" }}
          >
            {data.label}
          </Typography>
        </CardContent>
      </Card>
      {isReviewing ? (
        <Handle
          type="target"
          position={Position.Bottom}
          id="reviewer"
          style={{ left: 70 }}
        />
      ) : null}

      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={{ left: isReviewing ? 130 : 100 }}
      />
    </div>
  );
};
export default MemberNode;
