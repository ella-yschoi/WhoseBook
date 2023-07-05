package com.seb_main_004.whosbook.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404,"사용자를 찾을 수 없습니다."),
    MEMBER_EXISTS(409,"사용자가 이미 존재 합니다."),
    MEMBER_NO_HAVE_AUTHORIZATION(401,"인증되지 않은 사용자입니다."),
    MEMBER_NOT_VALID(409, "등록되지 않은 사용자입니다."),
    MEMBER_DOES_NOT_MATCH(403,"사용자가 맞지 않습니다."),
    INVALID_MEMBER_STATUS(400,"잘못된 사용자 상태입니다."),
    CURATION_NOT_FOUND(404,"큐레이션을 찾을 수 없습니다."),
    CURATION_ACCESS_DENIED(403,"큐레이션을 열람 할 수 없습니다."),
    CURATION_CANNOT_CHANGE(403,"큐레이션을 수정 할 수 없습니다."),
    CURATION_CANNOT_DELETE(403,"큐레이션을 삭제 할 수 없습니다."),
    CURATION_HAS_BEEN_DELETED(403,"큐레이션이 삭제 되었습니다."),
    REPLY_NOT_FOUND(404,"댓글을 찾을 수 없습니다."),
    REPLY_CANNOT_CHANGE(403,"댓글을 수정 할 수 없습니다."),
    REPLY_CANNOT_DELETE(403,"댓글을 삭제 할 수 없습니다."),
    NOT_IMPLEMENTATION(501,"Not Implementation");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }

}