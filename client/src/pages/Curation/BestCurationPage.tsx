import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import tw from 'twin.macro';

import CategoryTag from '../../components/category/CategoryTag';
import { LikedCurationAPI, LikedCurationCategoryAPI } from '../../api/curationApi';
import { ICurationResponseData } from '../../types/main';
import CurationCard from '../../components/cards/CurationCard';
import Label from '../../components/label/Label';
import Button from '../../components/buttons/Button';
import Footer from '../../components/Footer/Footer';
import ClockLoading from '../../components/Loading/ClockLoading';
import { customAlert } from '../../components/alert/sweetAlert';

const loadingStyle = {
  width: '80vw',
  height: '15vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const BestCurationPage = () => {
  const navigate = useNavigate();
  const { categoryId, page } = useParams();
  const [bestCurations, setBestCurations] = useState<ICurationResponseData[] | null>(null);
  const [currentPage, setCurrentPage] = useState<number>((Number(page) - 1) | 0);
  const [totalBestPage, setTotalBestPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectCategory, setSelectCategory] = useState<number>(Number(categoryId) | 0);
  const [isAllBtnActive, setIsAllBtnActive] = useState(true);

  const itemsPerPage = 9;

  const handleGetBestCurations = async () => {
    try {
      setIsLoading(true);
      const response =
        selectCategory === 0
          ? await LikedCurationAPI(currentPage + 1, itemsPerPage)
          : await LikedCurationCategoryAPI(currentPage + 1, itemsPerPage, selectCategory);
      if (response) {
        setBestCurations(response.data.data);
        setTotalBestPage(response.data.pageInfo.totalPages);
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAllCategory = () => {
    setCurrentPage(0);
    setSelectCategory(0);
    setIsAllBtnActive(true);
    navigate(`/curation/best/1`);
  };

  const handlePageChange = (selectedItem: { selected: number }) => {
    const selectedPage = selectedItem.selected;
    setCurrentPage(selectedPage);
  };

  const handleSetSelectCategory = (selectedValue: number) => {
    setCurrentPage(0);
    setIsAllBtnActive(false);
    setSelectCategory(selectedValue);

    navigate(`/curation/best/${selectedValue}/${currentPage + 1}`);
  };

  const handleCreateButtonClick = () => {
    const isLogin = localStorage.getItem('Authorization');

    if (isLogin) {
      navigate('/write');
    } else {
      customAlert({
        title: '로그인이 필요한 서비스입니다.',
        text: '후즈북 회원만 큐레이션 작성이 가능합니다.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#777676',
        confirmButtonText: 'Login',
        handleLoginPage: () => navigate('/login'),
      });
    }
  };
  useEffect(() => {
    if (selectCategory === 0) {
      setIsAllBtnActive(true);
      navigate(`/curation/best/${currentPage + 1}`);
    } else {
      setIsAllBtnActive(false);
      navigate(`/curation/best/${selectCategory}/${currentPage + 1}`);
    }
    handleGetBestCurations();
  }, [currentPage, selectCategory]);

  return (
    <>
      <Container>
        <TitleContainer>
          <TitleDiv>
            <Label type="title" content="큐레이션 카테고리" />
            <AllBtn onClick={handleAllCategory} isActive={isAllBtnActive}>
              전체 카테고리 보기
            </AllBtn>
          </TitleDiv>

          <CreateButton>
            <Button
              type="create"
              content="﹢ 큐레이션 작성하기"
              onClick={handleCreateButtonClick}
            />
          </CreateButton>
        </TitleContainer>
        <CategoryTag
          handleSetSelectCategory={handleSetSelectCategory}
          selectCategory={selectCategory}
        />
        <Section>
          <Label type="title" content="Best 큐레이션" />
          <br />
          <Label content="가장 인기있는 후즈북 큐레이션을 소개합니다." />
          <ul>
            {isLoading && (!bestCurations || bestCurations.length === 0) ? (
              <ClockLoading color="#3173f6" style={{ ...loadingStyle }} />
            ) : (
              bestCurations?.map((e) => (
                <CurationCard
                  key={e.curationId}
                  curationId={e.curationId}
                  image={e.curator.image}
                  emoji={e.emoji}
                  title={e.title}
                  content={e.content}
                  curationLikeCount={e.curationLikeCount}
                  memberNickname={e.curator.nickname}
                />
              ))
            )}
            {!isLoading && bestCurations && bestCurations.length === 0 && (
              <Comment>앗, 지금은 베스트 큐레이션이 없어요🫥</Comment>
            )}
          </ul>
        </Section>
        {bestCurations && (
          <PaginationContainer>
            <ReactPaginate
              pageCount={totalBestPage}
              onPageChange={handlePageChange}
              forcePage={currentPage}
              containerClassName={'pagination'}
              activeClassName={'active'}
              nextLabel=">"
              previousLabel="<"
            />
          </PaginationContainer>
        )}
      </Container>
      <Footer />
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: 35rem;
  & > * {
    width: 60rem;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: -1rem;
  margin: 0rem -1.2rem -3rem 3rem;
`;

export const TitleDiv = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;
export const AllBtn = styled.div<{ isActive: boolean }>`
  font-size: 1rem;
  padding: 0.3rem;
  cursor: pointer;
  color: ${({ isActive }) => (isActive ? '#3173f6' : 'inherit')};
  font-weight: ${({ isActive }) => (isActive ? '800' : 'inherit')};
  border-bottom: ${({ isActive }) => (isActive ? '3px solid #3173f6' : 'none')};
`;
const CreateButton = styled.div`
  width: 9.5rem;
  margin: 2rem 5rem;
  cursor: pointer;
`;

const Section = tw.div`
  h-64
  mt-5
  mb-10
  [> div]:flex
  [> div]:justify-between
  [> div > a > label]:last:text-black
  [> div > a > label]:last:cursor-pointer
  [> br]:mt-2
  [> ul]:mt-5
  [> ul]:flex
  [> ul]:gap-x-7 gap-y-7
  [> ul]:flex-wrap
`;

const Comment = tw.p`
  w-full
  mt-20
  text-center
  text-lg
  font-extrabold
  text-red-900
`;

const PaginationContainer = styled.div`
  margin-top: 30rem;
  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    justify-content: center;
    text-align: center;
    li {
      margin: 0 0.3rem;
      width: 2rem;
      height: 2rem;
      padding: 0.3rem;
      border-radius: 100%;
      cursor: pointer;
      a {
        display: inline-block;
        text-decoration: none;
        border-radius: 3px;
        text-align: center;
      }
      &.active {
        background-color: #3173f6;
        color: #fff;
        border-radius: 100%;
        a {
          color: #fff;
        }
      }
      &:hover {
        a {
          color: #3173f6;
        }
      }
    }
  }
`;

export default BestCurationPage;
