"use client";
export const dynamic = "force-dynamic";
import Pagination from "@/components/admin/Pagination";
import PostModal from "@/components/admin/PostModal";
import Spin from "@/components/admin/Spin";
import { useURLParams } from "@/hooks/useURLParams";
import postService from "@/services/postService";
import { Post } from "@/types/post.type";
import { Edit2, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";

const ITEMS_PER_PAGE = 10;
type ModalModeType = "add" | "edit";

export default function PostPage() {
  const { params, updatePage, updateSearch, updateSort, getCurrentSortValue } =
    useURLParams(ITEMS_PER_PAGE);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<ModalModeType>("add");
  const [postId, setPostId] = useState<string | number>("");
  const [keyword, setKeyword] = useState(params.q || "");
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    fetchAPI();
  }, [params.limit, params.skip, params.q, params.sortBy, params.order]);

  const fetchAPI = async () => {
    try {
      setLoading(true);
      const res = await postService.getAll(params);
      if (res && res.posts) {
        setPosts(res.posts);
        setTotalItems(res.total);
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (keyword !== params.q) {
        updateSearch(keyword);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [keyword]);

  const handleAdd = () => {
    setModalMode("add");
    setPostId("");
    setShowModal(true);
  };

  const handleEdit = (id: any) => {
    setModalMode("edit");
    setPostId(id);
    setShowModal(true);
  };

  const handleDelete = async (id: any) => {
    const result = await Swal.fire({
      title: "Xác nhận xóa",
      text: "Bạn có chắc chắn muốn xóa bài viết này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      const loadingToast = toast.loading("Đang xóa bài viết...");

      try {
        setLoading(true);
        const deleteResult = await postService.delete(id);

        if (deleteResult && deleteResult.isDeleted) {
          toast.success("Xóa bài viết thành công!", { id: loadingToast });
        }
      } catch (error) {
        console.error("Error delete post:", error);
        toast.error("Có lỗi xảy ra khi xóa bài viết!", { id: loadingToast });
      } finally {
        setLoading(false);
      }
    }
  };

  const handlePageChange = (page: number) => {
    updatePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleModalSuccess = () => {
    fetchAPI();
  };

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  return (
    <>
      <div className="p-4">
        <div className="container-page">
          <div className="header-page">
            <div className="page-toolbar">
              <div className="search-box">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
              <div className="select-box">
                <select
                  name="sort_by"
                  id="sort_by"
                  value={getCurrentSortValue()}
                  onChange={(e) => updateSort(e.target.value)}
                >
                  <option value="">--Sắp xếp--</option>
                  <option value="title_asc">Tên (A-Z)</option>
                  <option value="title_desc">Tên (Z-A)</option>
                </select>
              </div>
            </div>
            <div className="header-actions">
              <button className="btn btn-primary" onClick={handleAdd}>
                <Plus size={18} />
                <span>Thêm bài viết</span>
              </button>
            </div>
          </div>
          {loading ? (
            <Spin />
          ) : (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tiêu đề</th>
                    <th>Nội dung</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {posts &&
                    posts.map((item, index) => (
                      <tr key={item.id}>
                        <td>{(params.skip || 0) + index + 1}</td>
                        <td>{item.title}</td>
                        <td>{item.body}</td>
                        <td>
                          <div className="actions">
                            <button
                              className="btn-icon btn-edit"
                              onClick={() => handleEdit(item.id)}
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              className="btn-icon btn-delete"
                              onClick={() => handleDelete(item.id)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {totalPages > 1 && (
                <Pagination
                  currentPage={params.currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          )}

          {showModal && (
            <PostModal
              id={postId}
              modalMode={modalMode}
              onShowModal={setShowModal}
              onSuccess={handleModalSuccess}
            />
          )}
        </div>
      </div>
    </>
  );
}
