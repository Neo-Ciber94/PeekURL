import { Grid, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { trpc } from "../utils/trpc";

type GenerateUrl = {
  url: string;
};

export interface URLShortenerProps extends React.PropsWithChildren {
  onChange: (shortenUrl: string) => void;
}

export default function URLShortener({
  onChange,
  children,
}: URLShortenerProps) {
  const [url, setUrl] = useState("");
  const { isLoading, isError, error, ...shortUrlMutation } =
    trpc.useMutation("shorturl.generate");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<GenerateUrl>();

  useEffect(() => {
    if (error == null) {
      return;
    }

    setError("url", {
      message: error.message,
    });
  }, [error, setError]);

  const canGenerateUrl = useCallback(() => {
    return url.trim().length > 0;
  }, [url]);

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setUrl(text);
  };

  const handleShortenUrl = async (generate: GenerateUrl) => {
    try {
      const result = await shortUrlMutation.mutateAsync({
        url: generate.url,
      });

      console.log(result);
      onChange(result.shortUrl);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleShortenUrl)} style={{ width: "100%" }}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={9}>
          <TextField
            {...register("url")}
            value={url}
            error={!!errors.url}
            helperText={errors.url?.message}
            size="small"
            placeholder="URL to shorten"
            autoComplete="off"
            onChange={handleUrlChange}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <LoadingButton
            type="submit"
            variant="contained"
            disabled={!canGenerateUrl() || isLoading}
            loading={isLoading}
            sx={{ px: 2, width: "100%" }}
          >
            Shorten
          </LoadingButton>
        </Grid>

        {children}
      </Grid>
    </form>
  );
}
