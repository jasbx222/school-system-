"use client";

import useGetData from "@/app/hooks/useGetData";
import { useState } from "react";

type AccountNode = {
  id: number;
  name: string;
  code: string;
  balance: number;
  type: string;
  children_recursive: AccountNode[];
};

export default function AccountTree() {
  const { data } = useGetData<AccountNode[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL}accounts`
  );

  if (!data) return null;

  return (
    <div className="p-4 bg-white shadow rounded-lg space-y-2">
      {data.map((node) => (
        <TreeNode key={node.id} node={node} />
      ))}
    </div>
  );
}

function TreeNode({ node }: { node: AccountNode }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="pl-4 border-l border-gray-200">
      <div
        className="cursor-pointer py-1 flex items-center gap-2 hover:text-blue-600 transition"
        onClick={() => setExpanded(!expanded)}
      >
        <span className="text-gray-500 font-mono w-16">{node.code}</span>
        <span className="font-semibold">{node.name}</span>
    
          <span
            className={`font-semibold text-gray-800 ${
              node?.balance < 0 ? "text-red-500" : "text-green-500"
            }`}
          >
            {node.balance}
          </span>
     
        {node.children_recursive.length > 0 && (
          <span className="text-xs text-gray-400 ml-2">
            {expanded ? "▼" : "▶"}
          </span>
        )}
      </div>

      {expanded && node.children_recursive.length > 0 && (
        <div className="ml-4">
          {node.children_recursive.map((child) => (
            <TreeNode key={child.id} node={child} />
          ))}
        </div>
      )}
    </div>
  );
}
