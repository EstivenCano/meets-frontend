import Skeleton from "@/components/Feedback/Skeleton";
import dynamic from "next/dynamic";

const NewPostForm = dynamic(() => import("@/components/Forms/NewPostForm"));
const FeedList = dynamic(() => import("@/components/Display/FeedList"), {
  loading: () => (
    <div className='flex flex-col gap-y-4 w-full'>
      <Skeleton type='post' />
      <Skeleton type='post' />
    </div>
  ),
});

const postLst = [
  {
    id: 8,
    createdAt: "2023-04-29T02:29:03.323Z",
    updatedAt: "2023-04-29T02:29:03.323Z",
    title: "Another one? Sure!",
    content: "I'm trying to write something without sounds like a dumb",
    published: true,
    viewCount: 0,
    authorId: 8,
    author: {
      name: "Chase Cano Acevedo",
      profile: {
        picture:
          "https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=Fluffy",
      },
    },
    likedBy: [],
    comments: [],
    _count: {
      likedBy: 0,
      comments: 0,
    },
  },
  {
    id: 7,
    createdAt: "2023-04-29T02:23:52.862Z",
    updatedAt: "2023-04-29T02:23:52.862Z",
    title: "Let's create a new post",
    content: "Testing purposes, don't pay attention to this 😁",
    published: true,
    viewCount: 0,
    authorId: 8,
    author: {
      name: "Chase Cano Acevedo",
      profile: {
        picture:
          "https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=Fluffy",
      },
    },
    likedBy: [
      {
        name: "Estiven Cano Urrego",
        profile: {
          picture:
            "https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=Milo",
        },
      },
    ],
    comments: [
      {
        author: {
          name: "Estiven Cano Urrego",
          profile: {
            picture:
              "https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=Milo",
          },
        },
        content: "Nice stuff!",
      },
    ],
    _count: {
      likedBy: 1,
      comments: 1,
    },
  },
  {
    id: 6,
    createdAt: "2023-04-28T22:26:21.003Z",
    updatedAt: "2023-04-28T22:26:21.003Z",
    title: "Third Post 😃",
    content: "Alert messages are great!",
    published: true,
    viewCount: 0,
    authorId: 6,
    author: {
      name: "Estiven Cano Urrego",
      profile: {
        picture:
          "https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=Milo",
      },
    },
    likedBy: [],
    comments: [],
    _count: {
      likedBy: 0,
      comments: 0,
    },
  },
  {
    id: 5,
    createdAt: "2023-04-28T22:24:29.227Z",
    updatedAt: "2023-04-28T22:24:29.227Z",
    title: "What's new?",
    content: "Just wanted to know new cool stuff going on here",
    published: true,
    viewCount: 0,
    authorId: 6,
    author: {
      name: "Estiven Cano Urrego",
      profile: {
        picture:
          "https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=Milo",
      },
    },
    likedBy: [],
    comments: [],
    _count: {
      likedBy: 0,
      comments: 0,
    },
  },
  {
    id: 4,
    createdAt: "2023-04-28T22:19:20.260Z",
    updatedAt: "2023-04-28T22:19:20.260Z",
    title: "Hey, Watch this! 😶",
    content: "This is my first post, hi all!\n\nLet's connect!",
    published: true,
    viewCount: 0,
    authorId: 6,
    author: {
      name: "Estiven Cano Urrego",
      profile: {
        picture:
          "https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=Milo",
      },
    },
    likedBy: [],
    comments: [],
    _count: {
      likedBy: 0,
      comments: 0,
    },
  },
];

export default function Feed() {
  return (
    <>
      <h1 className='self-start text-sm font-bold mb-2 sr-only'>
        This is your Feed
      </h1>
      <NewPostForm />
      <hr className='border-violet-400 w-full my-4' />
      <div className='flex flex-col items-center w-full pb-2'>
        <p className='text-sm text-gray-500 mb-2'>
          Here you can see the posts of the people that you follow.
        </p>
        <FeedList post={postLst} />
      </div>
    </>
  );
}
