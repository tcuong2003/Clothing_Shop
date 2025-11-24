import ListNewPost from "@/components/ListNewPost";
import ListPost from "@/components/ListPost";

async function getPost() {
  const res = await fetch(
    "https://gnews.io/api/v4/top-headlines?token=3cdefe12e69b109a299c69c513134e20"
  );
  const result = await res.json();
  return result;
}

async function getNewPost() {
  const res = await fetch(
    "https://gnews.io/api/v4/top-headlines?token=3cdefe12e69b109a299c69c513134e20"
  );
  const result = await res.json();
  return result;
}

export default async function BlogPage() {
  const data = await getPost();
  const dataNew = await getNewPost();

  const articles = data.articles || [];
  const newArticles = dataNew.articles?.slice(0, 5) || [];

  return (
    <>
      <div className="flex flex-row justify-center mx-auto space-x-0 py-5 md:px-2 lg:px-10 md:space-x-5">
        <div className="flex-1">
          <div className="text-2xl text-center font-semibold uppercase mb-5">
            Tất cả bài viết
          </div>
          <ListPost articles={articles} />
        </div>
        <div className="w-[320px] space-y-5 hidden md:block">
          <div className="w-full text-base font-semibold text-left text-gray-700 uppercase p-4 bg-white shadow-[0_10px_36px_0_rgba(0,0,0,0.16),_0_0_0_1px_rgba(0,0,0,0.06)]">
            Tất cả bài viết
          </div>
          <div className="bg-white shadow-[0_10px_36px_0_rgba(0,0,0,0.16),_0_0_0_1px_rgba(0,0,0,0.06)] p-4">
            <div className="text-md font-semibold uppercase">
              Bài viết mới nhất
            </div>
            <ListNewPost newArticles={newArticles} />
          </div>
        </div>
      </div>
    </>
  );
}
