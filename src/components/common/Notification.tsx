import { Check, Close } from '@/assets/icons';
import Button from '@/components/common/Button/Button';
import IconWrapper from '@/components/common/IconWrapper';
import { Overlay } from '@/components/common/Overlay';
import { commonButtonStyle, headerStyle, sidebarContainer } from '@/components/common/Sidebar';
import notificationInfiniteQueryOptions from '@/hooks/queries/useNotification';
import useInfinite from '@/hooks/useInfinite';
import { scrollBarStyle } from '@/styles/globalStyles';
import { NotificationResponse } from '@/types/notification';
import { css, Theme } from '@emotion/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { MouseEvent, MouseEventHandler, useState } from 'react';

const invitationType = {
  INVITE_REQUEST: 'INVITE_REQUEST',
  INVITE_ACCEPT: 'INVITE_ACCEPT',
};

const Notification = ({ toggleOpen }: { toggleOpen: VoidFunction }) => {
  const { data: notifications, fetchNextPage, hasNextPage } = useInfiniteQuery(notificationInfiniteQueryOptions());

  const handleClose = () => toggleOpen();

  const loadMoreNotifications = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <Overlay
      style={{
        justifyContent: 'flex-end',
      }}
      role="dialog"
      preventClick={false}
      onClick={handleClose}
    >
      <div css={sidebarContainer} onClick={(e) => e.stopPropagation()}>
        <header css={headerStyle}>
          <h1>알림</h1>
          <IconWrapper aria-label="Close sidebar" onClick={handleClose} role="button" css={commonButtonStyle}>
            <Close />
          </IconWrapper>
        </header>
        <Notification.List
          notifications={notifications ?? []}
          loadMoreNotifications={loadMoreNotifications}
          hasNextPage={hasNextPage}
        />
      </div>
    </Overlay>
  );
};

export default Notification;

Notification.List = ({
  notifications,
  loadMoreNotifications,
  hasNextPage,
}: {
  notifications: NotificationResponse[];
  loadMoreNotifications: VoidFunction;
  hasNextPage: boolean;
}) => {
  const { loadMoreRef } = useInfinite(loadMoreNotifications, hasNextPage);

  return (
    <ul css={listStyle}>
      {notifications.map((data) => (
        <Notification.Item key={data.notificationId} data={data} />
      ))}
      {hasNextPage && <div ref={loadMoreRef} />}
    </ul>
  );
};

Notification.Item = ({ data }: { data: NotificationResponse }) => {
  const [isAccept, setIsAccept] = useState(false);
  const { notificationType, notificationData, read } = data;

  const message =
    notificationType === invitationType.INVITE_ACCEPT
      ? `${notificationData.squadName}스쿼드에서 초대장이 도착했어요.`
      : `${notificationData.userName}님을 ${notificationData.squadName}스쿼드에 초대했어요`;

  const handleReadStatus = (e: MouseEvent<HTMLLIElement>) => {
    // TODO: 읽음 처리 PUT 요청
    if (read) return;
  };

  const handleAccept = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    // TODO: 수락 API 연동 - 수락 성공 시 setIsAccept 업데이트
    setIsAccept(true);
  };

  return (
    <li css={[itemStyle, markStyle(read)]} onClick={handleReadStatus}>
      <p>{message}</p>
      {notificationType === invitationType.INVITE_ACCEPT && (
        <AcceptStatus isAccept={isAccept} onAccept={handleAccept} />
      )}
    </li>
  );
};

const AcceptStatus = ({ isAccept, onAccept }: { isAccept: boolean; onAccept: MouseEventHandler }) => {
  if (!isAccept) {
    return <Button text="수락" variant="primary" onClick={onAccept} css={[isAccept && buttonStyle]} />;
  }
  return (
    <IconWrapper css={acceptIconStyle} onClick={(e) => e.stopPropagation()}>
      <Check style={checkIconStyle} />
    </IconWrapper>
  );
};

const listStyle = css`
  margin-top: 24px;
  overflow-y: auto;

  ${scrollBarStyle}
`;

const itemStyle = (theme: Theme) => css`
  height: 56px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px 16px;
  ${theme.typography.size_14}
  font-weight: 400;
  flex: 2;

  & p {
    width: 190px;
    margin-right: 8px;
  }

  & button {
    width: 56px;
  }

  :hover {
    background-color: #e2e2e250;
    cursor: pointer;
  }
`;

const markStyle = (isRead: boolean) => css`
  ::before {
    opacity: ${isRead && 0};
    content: '';
    width: 6px;
    height: 6px;
    background-color: red;
    border-radius: 50%;
    margin-top: -24px;
    margin-right: 8px;
  }
`;

const buttonStyle = () => css`
  opacity: 50%;
  pointer-events: none;
`;

const acceptIconStyle = css`
  width: 56px;
  display: flex;
  justify-content: center;
`;

const checkIconStyle = {
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  backgroundColor: 'var(--color-success)',
  color: '#fff',
  padding: '4px',
};
