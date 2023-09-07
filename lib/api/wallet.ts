import useSWR from "swr";

const baseUrl = "http://localhost:8080/wallets";
const fetcher = (url: any) =>
  fetch(url)
    .then((res) => res.json())
    .catch((err) => console.log(err));

interface CreateUpdateWallet {
  description: string;
  createdAt: string;
}

function useWalletPaginated(
  pageIndex: number,
  pageSize: number,
  filter?: string,
  order?: string
) {
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.append("pageIndex", `${pageIndex}`);
  urlSearchParams.append("pageSize", `${pageSize}`);
  urlSearchParams.append("filter", filter || "");
  urlSearchParams.append("order", order || "");

  return useSWR(`${baseUrl}?${urlSearchParams}`, fetcher, {
    revalidateOnFocus: false,
    errorRetryCount: 2,
  });
}

function createWallet(wallet: CreateUpdateWallet) {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(wallet),
  }).then((res) => res.json());
}

export { useWalletPaginated, createWallet };
