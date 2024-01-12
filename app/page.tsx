import { getBoardNames } from "./api";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function page() {
  const user = await currentUser();
  console.log(user, "user");

  // .catch((err) => {
  // console.log(err);
  // });

  if (!user) redirect("/platform-launch");
  // const user = null;
  if (user) {
    const { data: boardNames } = await getBoardNames(`/user/names/${user.id}`);
    const slug = boardNames && boardNames[0]?.slug;
    if (!boardNames) {
      redirect("/platform-launch");
    }
    if (slug) {
      redirect(`/${slug}`);
    }
  } //const {data: board} = await getBoard(url);
}
