"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[735],{4735:(e,t,i)=>{i.d(t,{storiesApi:()=>g});var a=i(3595);let r="https://ioornfyxmqejmhapdfvg.supabase.co",s="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlvb3JuZnl4bXFlam1oYXBkZnZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMjk4NTQsImV4cCI6MjA2NzgwNTg1NH0.DymS3VOr6HjYktNOTk5n_UktDDDkkbha7-9kdg-ymcY",n=r&&s?(0,a.UU)(r,s):null,o=e=>e?.map(e=>({id:e.id,src:e.src,alt:e.alt,position:e.position,fileName:e.file_name,fileSize:e.file_size,mimeType:e.mime_type,storagePath:e.storage_path}))||[],g={async getAll(){if(!n)return console.warn("Supabase client not initialized - returning empty array"),[];let{data:e,error:t}=await n.from("stories").select(`
        *,
        story_tags!inner (
          tag_id,
          tags!inner (
            id,
            name,
            slug,
            description,
            color
          )
        ),
        story_images (
          id,
          src,
          alt,
          position,
          file_name,
          file_size,
          mime_type,
          storage_path
        )
      `).order("created_at",{ascending:!1});if(t)throw console.error("Error fetching stories:",t),t;return e?.map(e=>({id:e.id,title:e.title,description:e.description,content:e.content,tags:e.story_tags?.map(e=>e.tags.name)||[],images:o(e.story_images),readingTime:e.reading_time,ageGroup:e.age_group,slug:e.slug,createdAt:e.created_at,updatedAt:e.updated_at}))||[]},async getBySlug(e){if(!n)return console.warn("Supabase client not initialized - returning null"),null;let{data:t,error:i}=await n.from("stories").select(`
        *,
        story_tags!inner (
          tag_id,
          tags!inner (
            id,
            name,
            slug,
            description,
            color
          )
        ),
        story_images (
          id,
          src,
          alt,
          position,
          file_name,
          file_size,
          mime_type,
          storage_path
        )
      `).eq("slug",e).single();if(i)throw console.error("Error fetching story:",i),i;return t?{id:t.id,title:t.title,description:t.description,content:t.content,tags:t.story_tags?.map(e=>e.tags.name)||[],images:o(t.story_images),readingTime:t.reading_time,ageGroup:t.age_group,slug:t.slug,createdAt:t.created_at,updatedAt:t.updated_at}:null},async getById(e){if(!n)return console.warn("Supabase client not initialized - returning null"),null;let{data:t,error:i}=await n.from("stories").select(`
        *,
        story_tags!inner (
          tag_id,
          tags!inner (
            id,
            name,
            slug,
            description,
            color
          )
        ),
        story_images (
          id,
          src,
          alt,
          position,
          file_name,
          file_size,
          mime_type,
          storage_path
        )
      `).eq("id",e).single();if(i)throw console.error("Error fetching story:",i),i;return t?{id:t.id,title:t.title,description:t.description,content:t.content,tags:t.story_tags?.map(e=>e.tags.name)||[],images:o(t.story_images),readingTime:t.reading_time,ageGroup:t.age_group,slug:t.slug,createdAt:t.created_at,updatedAt:t.updated_at}:null},async getByTagSlug(e){if(!n)return console.warn("Supabase client not initialized - returning empty array"),[];let{data:t,error:i}=await n.from("stories").select(`
        *,
        story_tags!inner (
          tag_id,
          tags!inner (
            id,
            name,
            slug,
            description,
            color
          )
        ),
        story_images (
          id,
          src,
          alt,
          position,
          file_name,
          file_size,
          mime_type,
          storage_path
        )
      `).eq("story_tags.tags.slug",e).order("created_at",{ascending:!1});if(i)throw console.error("Error fetching stories by tag:",i),i;return t?.map(e=>({id:e.id,title:e.title,description:e.description,content:e.content,tags:e.story_tags?.map(e=>e.tags.name)||[],images:o(e.story_images),readingTime:e.reading_time,ageGroup:e.age_group,slug:e.slug,createdAt:e.created_at,updatedAt:e.updated_at}))||[]},async getByTag(e){if(!n)return console.warn("Supabase client not initialized - returning empty array"),[];let{data:t,error:i}=await n.from("stories").select(`
        *,
        story_tags!inner (
          tag_id,
          tags!inner (
            id,
            name,
            slug,
            description,
            color
          )
        ),
        story_images (
          id,
          src,
          alt,
          position,
          file_name,
          file_size,
          mime_type,
          storage_path
        )
      `).eq("story_tags.tags.name",e).order("created_at",{ascending:!1});if(i)throw console.error("Error fetching stories by tag:",i),i;return t?.map(e=>({id:e.id,title:e.title,description:e.description,content:e.content,tags:e.story_tags?.map(e=>e.tags.name)||[],images:o(e.story_images),readingTime:e.reading_time,ageGroup:e.age_group,slug:e.slug,createdAt:e.created_at,updatedAt:e.updated_at}))||[]},async search(e){if(!e.trim())return[];if(!n)return console.warn("Supabase client not initialized - returning empty array"),[];let{data:t,error:i}=await n.from("stories").select(`
        *,
        story_tags!inner (
          tag_id,
          tags!inner (
            id,
            name,
            slug,
            description,
            color
          )
        ),
        story_images (
          id,
          src,
          alt,
          position,
          file_name,
          file_size,
          mime_type,
          storage_path
        )
      `).or(`title.ilike.%${e}%,description.ilike.%${e}%,content.ilike.%${e}%`).order("created_at",{ascending:!1});if(i)throw console.error("Error searching stories:",i),i;return t?.map(e=>({id:e.id,title:e.title,description:e.description,content:e.content,tags:e.story_tags?.map(e=>e.tags.name)||[],images:o(e.story_images),readingTime:e.reading_time,ageGroup:e.age_group,slug:e.slug,createdAt:e.created_at,updatedAt:e.updated_at}))||[]}}}}]);