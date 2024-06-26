import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = 'force-dynamic';

export const POST = async (request) => {
  try {
    await connectDB();
    const { yachtId } = await request.json();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const { userId } = sessionUser;

    // Find user in DB 
    const user = await User.findOne({_id: userId});

    // Check if yacht is bookmarked
    let isBookmarked = user.bookmarks.includes(yachtId);

    return new Response(JSON.stringify({ isBookmarked }), { status: 200 });

  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
