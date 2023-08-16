import { stringify } from "qs";
import { map, Observable, throwError } from "rxjs";
import { ajax } from "rxjs/internal/ajax/ajax";
import { IUser } from "../Model";
import { AjaxResponse } from "rxjs/ajax";

export * as AuthenticationRepository from './Authentication/AuthenticationRepository'
export * as TokenRepository from './Token/TokenRepository'

export const post = <B, R>(
  path: string,
  body: B,
  user?: IUser
): Observable<R> => {
  console.groupCollapsed(`[POST] ${path}`);
  console.log(body);
  console.log(user);
  console.groupEnd();
  return ajax
    .post(path, body, {
      ...(user ? { authorization: `Bearer ${user?.auth.token}` } : {}),
    })
    .pipe(
      map((request) => {
        if (!request.response) throwError(() => Error(`${request.status}`));
        return request.response as R;
      })
    );
};

export const get = <P, R>(
  path: string,
  params: P,
  user?: IUser
): Observable<R> => {
  console.groupCollapsed(`[GET] ${path}`);
  console.log(params);
  console.log(user);
  console.groupEnd();
  return ajax
    .get(path + `?${stringify(params)}`, {
      ...(user ? { authorization: `Bearer ${user?.auth.token}` } : {}),
    })
    .pipe(
      map((request) => {
        if (!request.response) throwError(() => Error(`${request.status}`));
        return request.response as R;
      })
    );
};

export const remove = <R>(path: string, user?: IUser): Observable<R> => {
  console.groupCollapsed(`[REMOVE] ${path}`);
  console.log(user);
  console.groupEnd();
  return ajax
    .delete(path, {
      ...(user ? { authorization: `Bearer ${user?.auth.token}` } : {}),
    })
    .pipe(
      map((request) => {
        if (!request.response) throwError(() => Error(`${request.status}`));
        return request.response as R;
      })
    );
};

export const put = <B, R>(
  path: string,
  body: B,
  user?: IUser
): Observable<R> => {
  console.groupCollapsed(`[PUT] ${path}`);
  console.log(body);
  console.log(user);
  console.groupEnd();
  return ajax
    .put(path, body, {
      ...(user ? { authorization: `Bearer ${user?.auth.token}` } : {}),
    })
    .pipe(
      map((request) => {
        if (!request.response) throwError(() => Error(`${request.status}`));
        return request.response as R;
      })
    );
};

export const fileUpload = <B, R>(
  path: string,
  body: B & {
    [key: string]: any;
  },
  file: File,
  user?: IUser
): Observable<R> => {
  const formData = new FormData();
  formData.append("file", file);
  Object.keys(body).forEach((key) => {
    formData.append(key, body[key]);
  });

  console.groupCollapsed(`[FILE UPLOAD] ${path}`);
  console.log(file);
  console.log(user);
  console.groupEnd();

  return ajax
    .post(path, formData, {
      ...(user ? { authorization: `Bearer ${user?.auth.token}` } : {}),
      ...{ headers: "Content-Type': 'application/octet-stream" },
    })
    .pipe(
      map((request) => {
        if (!request.response) throwError(() => Error(`${request.status}`));
        return request.response as R;
      })
    );
};

export const fileUploadWithProgress = <B, R>(
  path: string,
  body: B & {
    [key: string]: any;
  },
  user?: IUser
): Observable<AjaxResponse<R>> => {
  const formData = new FormData();
  Object.keys(body).forEach((key) => {
    formData.append(key, body[key]);
  });

  return ajax({
    url: path,
    method: "POST",
    headers: {
      ...(user ? { authorization: `Bearer ${user?.auth.token}` } : {}),
      ...{ headers: "Content-Type': 'application/octet-stream" },
    },
    includeUploadProgress: true,
    body: formData,
  });
};
