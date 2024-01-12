'use client';

import { useEffect } from 'react';
import useSearchParams from '@/hooks/useSearchParams';
import { useDebounce } from '@/hooks/useDebounce';
import { MAX_SEARCH_RESULTS_LIMIT } from '@/config/constants/search-filters';
import { trpc } from '@/lib/trpc/TRPCProvider';
import { usePathname, useRouter } from 'next/navigation';
import { bookGenres } from '@/config/constants/author';

import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import { Book, SearchIcon } from 'lucide-react';
import SearchInput from '../search/SearchInput';
import SearchedResults from '../search/SearchedResults';
import SearchResultSkeleton from '../loadings/SearchResultSkeleton';

type SearchModalProps = {
  userId: string;
};

const SearchModal = ({ userId }: SearchModalProps) => {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const { getQueryParams, deleteQueryParams } = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const debouncedValue = useDebounce(getQueryParams('q') || '', 800);

  const { data, isFetching, isFetchingNextPage, hasNextPage, refetch, fetchNextPage } =
    trpc.bookRouter.filter.useInfiniteQuery(
      {
        q: debouncedValue,
        limit: MAX_SEARCH_RESULTS_LIMIT,
      },
      {
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
        keepPreviousData: true,
        suspense: true,
        initialData: {
          pageParams: [undefined],
          pages: [{ books: [], nextCursor: undefined }],
        },
        enabled: false,
        refetchOnWindowFocus: false,
      }
    );

  useEffect(() => {
    if (debouncedValue.length < 2) return;
    refetch();
  }, [debouncedValue, refetch]);

  const books = data?.pages.flatMap((pages) => pages.books);

  return (
    <>
      {userId && (
        <Button onClick={onOpen} size='sm' isIconOnly radius='md'>
          <SearchIcon className='h-5 w-5' />
        </Button>
      )}
      <Modal
        size='xl'
        radius='none'
        scrollBehavior='inside'
        placement='center'
        backdrop='blur'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={() =>
          deleteQueryParams('q')?.length && router.replace(pathname + '?' + deleteQueryParams('q'))
        }
        classNames={{
          closeButton: 'hidden',
          base: 'rounded-lg',
        }}
        className='border-1 border-foreground-100 bg-background'
      >
        <ModalContent>
          <ModalHeader className='rounded-t-sm p-0'>
            <SearchInput isOpen={isOpen} />
          </ModalHeader>

          <ModalBody className='p-4 scrollbar scrollbar-track-foreground-100 scrollbar-thumb-gray-700 scrollbar-thumb-rounded-full scrollbar-w-1'>
            {debouncedValue.length >= 0 && debouncedValue.length < 2 ? (
              <>
                <h2 className='text-lg font-semibold text-primary'>Book Genres</h2>
                {bookGenres.map((genre, index) => (
                  <Button
                    key={index}
                    onClick={() => {
                      onClose();
                      router.push(`/discover?genres=${genre.toLowerCase()}`);
                    }}
                    size='lg'
                    radius='sm'
                    className='min-h-[4rem] w-full justify-start bg-default-50 pl-4 text-foreground-500 hover:bg-primary hover:text-white'
                  >
                    <Book className='h-6 w-6' />
                    {genre}
                  </Button>
                ))}
              </>
            ) : (
              books?.map((book) => (
                <SearchedResults
                  key={book.id}
                  book={book}
                  onClick={() => {
                    router.push(`/books/${book.id}`);
                    onClose();
                  }}
                />
              ))
            )}
            {(isFetching || isFetchingNextPage) && <SearchResultSkeleton />}
            {!(debouncedValue.length >= 0 && debouncedValue.length < 2) &&
              !isFetching &&
              !isFetchingNextPage &&
              books?.length === 0 && (
                <p className='py-12 text-center text-foreground-500'>No books found.</p>
              )}
            {hasNextPage && (
              <Button size='sm' radius='sm' className='font-medium' onClick={() => fetchNextPage()}>
                Load More
              </Button>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchModal;
