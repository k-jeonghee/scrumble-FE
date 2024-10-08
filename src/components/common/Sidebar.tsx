import { Close, Edit } from '@/assets/icons';
import IconWrapper from '@/components/common/IconWrapper';
import { SidebarMemberList } from '@/components/common/Member';
import { Overlay } from '@/components/common/Overlay';
import { ROLE } from '@/constants/role';
import { squadDetailQueryOptions } from '@/hooks/queries/useSquad';
import useUpdateSquadName from '@/hooks/useUpdateSquadName';
import { css, Theme } from '@emotion/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const Sidebar = ({ closeSidebar }: { closeSidebar: VoidFunction }) => {
  const param = useParams();
  const squadId = Number(param.squadId);
  const { data: squadDetail } = useSuspenseQuery({
    ...squadDetailQueryOptions(squadId),
    refetchOnMount: false,
  }).data;
  const { squadName, squadMembers, mySquadMemberRole } = squadDetail;
  const { ModalContainer: EditNameModal, handleUpdateSquadName } = useUpdateSquadName(squadId);

  return (
    <Overlay
      preventClick={false}
      onClose={closeSidebar}
      style={{
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
      }}
      role="dialog"
    >
      <div css={container} onClick={(e) => e.stopPropagation()}>
        <header css={headerStyle}>
          <h1>스쿼드 관리</h1>
          <IconWrapper aria-label="Close sidebar" onClick={closeSidebar} role="button" css={commonButtonStyle}>
            <Close />
          </IconWrapper>
        </header>
        <section css={squadInfoStyle} aria-labelledby="squadInfoHeading">
          <h2 id="squadInfoHeading">스쿼드 정보</h2>
          <div>
            <h3>{squadName}</h3>
            <IconWrapper
              aria-label="Edit squad name"
              onClick={handleUpdateSquadName}
              role="button"
              css={commonButtonStyle}
              disabled={mySquadMemberRole !== ROLE.LEADER}
            >
              <Edit />
            </IconWrapper>
          </div>
          <span>생성일</span>
        </section>
        <section css={membersStyle} aria-labelledby="membersHeading">
          <h2 id="membersHeading">멤버</h2>
          <SidebarMemberList members={squadMembers} myRole={squadDetail.mySquadMemberRole} />
        </section>
        <section css={settingsStyle} aria-labelledby="settingsHeading">
          <h2 id="settingsHeading">설정</h2>
          <ul>
            <li
              onClick={() => {
                // TODO: 검색창 연결
              }}
            >
              멤버 초대
            </li>
            {mySquadMemberRole === ROLE.LEADER && (
              <li
                onClick={() => {
                  // TODO: 리더 권한 위임
                }}
              >
                리더 변경
              </li>
            )}
            {mySquadMemberRole === ROLE.LEADER && (
              <li
                onClick={() => {
                  // TODO: 스쿼드 삭제
                }}
              >
                스쿼드 삭제
              </li>
            )}
          </ul>
        </section>
        <button css={exitButtonStyle} onClick={() => console.log('나갈라우?')}>
          나가기
        </button>
      </div>
      <EditNameModal />
    </Overlay>
  );
};

export default Sidebar;

export const commonButtonStyle = (theme: Theme) => css`
  width: 28px;
  height: 28px;
  color: ${theme.colors.text};
`;

const container = (theme: Theme) => css`
  right: 0;
  top: 0;
  width: 300px;
  height: 100%;
  background-color: ${theme.colors.background.white};
  box-shadow: -2px 0 20px rgba(0, 0, 0, 0.2);
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  & h2 {
    font-size: ${theme.typography.size_18};
    font-weight: 600;
    margin-bottom: 16px;
  }

  & h2::after {
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background-color: ${theme.colors.gray.gray100};
    margin-top: 8px;
  }
`;

const headerStyle = (theme: Theme) => css`
  font-size: ${theme.typography.size_24};
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  padding: 0 16px;
`;

const squadInfoStyle = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
  margin-bottom: 48px;
  padding: 0 16px;

  & h3 {
    font-weight: 500;
  }

  & div {
    display: flex;
    gap: 4px;
    align-items: center;
  }

  & span {
    font-size: ${theme.typography.size_14};
    color: ${theme.colors.gray.gray300};
  }
`;

const membersStyle = (theme: Theme) => css`
  padding: 0 16px;
  margin-bottom: 48px;

  & li {
    padding: 8px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const settingsStyle = css`
  padding: 0 16px;
  margin-bottom: 64px;
  flex: 1;

  & li {
    padding: 8px 0;
    cursor: pointer;
  }

  & li:hover {
    opacity: 0.5;
  }
`;

const exitButtonStyle = (theme: Theme) => css`
  background-color: ${theme.colors.background.white};
  font-size: ${theme.typography.size_14};
  color: ${theme.colors.gray.gray200};
  border-top: 1px solid ${theme.colors.gray.gray200};
  font-weight: 700;
  margin-top: auto;
  height: 56px;
  text-align: left;
  padding: 0 16px;
`;
