import { instance } from '@/apis';
import { INVITATION_RESPONSE_STATUS } from '@/constants/squad';
import {
  AcceptSquadInvitationParams,
  AssignSquadLeaderParamType,
  CreateSquadParamType,
  ExitAndDeleteSquadNameParamType,
  InviteMemberParamType,
  RemoveUserFromSquadParamType,
  UpdateSquadNameParamType,
} from '@/hooks/mutations';

import { ApiResponse, SearchMemberResponse, Squad, SquadDetail } from '@/types';
import { MutationFunction } from '@tanstack/react-query';

export const getSquadList = async (): Promise<{ data: Squad[] }> => {
  const response = await instance.get('/api/squads?role=');
  return response.data;
};

export const createSquad: MutationFunction<ApiResponse<Squad>, CreateSquadParamType> = async ({
  squadName,
}): Promise<ApiResponse<Squad>> => {
  const response = await instance.post('/api/squads', { squadName });
  return response.data;
};

export const getSquadDetail = async (squadId: number): Promise<{ data: SquadDetail }> => {
  const response = await instance.get(`/api/squads/${squadId}`);
  return response.data;
};

export const updateSquadName: MutationFunction<ApiResponse<SquadDetail>, UpdateSquadNameParamType> = async ({
  squadId,
  squadName,
}): Promise<ApiResponse<SquadDetail>> => {
  const response = await instance.put(`/api/squads/${squadId}`, { squadName });
  return response.data;
};

export const deleteSquad: MutationFunction<ApiResponse<null>, ExitAndDeleteSquadNameParamType> = async ({
  squadId,
}): Promise<ApiResponse<null>> => {
  const response = await instance.delete(`/api/squads/${squadId}`);
  return response.data;
};

export const exitSquad: MutationFunction<ApiResponse<null>, ExitAndDeleteSquadNameParamType> = async ({
  squadId,
}): Promise<ApiResponse<null>> => {
  const response = await instance.delete(`/api/squads/${squadId}/withdraw`);
  return response.data;
};

export const assignSquadLeader: MutationFunction<ApiResponse<null>, AssignSquadLeaderParamType> = async ({
  squadId,
  newLeaderId,
}): Promise<ApiResponse<null>> => {
  const response = await instance.put(`/api/squads/${squadId}/leader`, { newLeaderId });
  return response.data;
};

export const removeUserFromSquad: MutationFunction<ApiResponse<null>, RemoveUserFromSquadParamType> = async ({
  squadId,
  kickedMemberId,
}) => {
  const response = await instance.delete(`/api/squads/${squadId}/kick`, {
    data: {
      kickedMemberId,
    },
  });
  return response.data;
};

export const getSearchMember = async (email: string): Promise<ApiResponse<SearchMemberResponse>> => {
  const response = await instance.get(`/api/users/${email}`);
  return response.data;
};

export const inviteMember: MutationFunction<ApiResponse<null>, InviteMemberParamType> = async ({
  squadId,
  memberId,
}) => {
  const response = await instance.post(`/api/squads/${squadId}/invitations`, {
    newMemberId: memberId,
  });
  return response.data;
};

export const acceptSquadInvite: MutationFunction<ApiResponse<null>, AcceptSquadInvitationParams> = async ({
  squadId,
}) => {
  const response = await instance.put(`/api/squads/${squadId}/invitations/accept`, {
    responseStatus: INVITATION_RESPONSE_STATUS.JOIN,
  });
  return response.data;
};
