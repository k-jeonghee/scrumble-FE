import { squadQueryOptions } from '@/hooks/useQueries';
import { breakpoints, mobileMediaQuery, pcMediaQuery } from '@/styles/breakpoints';
import { Squad } from '@/types/squad';
import { css, Theme } from '@emotion/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const SquadPage = () => {
  const { data: squadList } = useSuspenseQuery(squadQueryOptions()).data;
  return (
    <ul>
      {squadList.map((squad) => (
        <SquadItem key={squad.squadId} squad={squad} />
      ))}
    </ul>
  );
};

export default SquadPage;

const SquadItem = ({ squad }: { squad: Squad }) => {
  const navigate = useNavigate();
  return (
    <li css={itemStyle} onClick={() => navigate(`/squads/${squad.squadId}`)}>
      {squad.squadName}
    </li>
  );
};

const itemStyle = (theme: Theme) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 82px;
  padding: 12px;
  margin: 16px;
  border-radius: 8px;
  background-color: ${theme.colors.background.lightYellow};
  box-shadow: 0px 3px 28px 0px rgba(37, 37, 37, 0.05);
  cursor: pointer;

  ${mobileMediaQuery(css`
    max-width: ${breakpoints.mobile};
    ${theme.typography.size_16}
  `)}

  ${pcMediaQuery(css`
    max-width: ${breakpoints.pc};
    ${theme.typography.size_24}
    font-weight: 500;
  `)}
`;
