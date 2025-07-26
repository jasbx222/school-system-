import React from "react";

interface DeleteModelProps {
  id: number;
  handleDelete: (id: number) => void;
  setIsModalOpen: (value: boolean) => void;
}

const DeleteModel = ({ id, handleDelete, setIsModalOpen }: DeleteModelProps) => {
  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-sm text-center space-y-4">
        <h2 className="text-lg font-bold text-gray-800">تأكيد الحذف</h2>
        <p className="text-gray-600 text-sm">
          هل أنت متأكد أنك تريد حذف هذا العنصر؟ لا يمكن التراجع.
        </p>
        <div className="flex justify-center gap-3 mt-4">
          <button
            onClick={() => handleDelete(id)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
          >
            نعم، احذف
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModel;
