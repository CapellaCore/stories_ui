"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[735],{4735:(e,t,i)=>{i.d(t,{storiesApi:()=>r});let a=(0,i(3595).UU)("https://ioornfyxmqejmhapdfvg.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlvb3JuZnl4bXFlam1oYXBkZnZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMjk4NTQsImV4cCI6MjA2NzgwNTg1NH0.DymS3VOr6HjYktNOTk5n_UktDDDkkbha7-9kdg-ymcY"),s=e=>e?.map(e=>({id:e.id,src:e.src,alt:e.alt,position:e.position,fileName:e.file_name,fileSize:e.file_size,mimeType:e.mime_type,storagePath:e.storage_path}))||[],r={async getAll(){let{data:e,error:t}=await a.from("stories").select(`
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
      `).order("created_at",{ascending:!1});if(t)throw console.error("Error fetching stories:",t),t;return e?.map(e=>({id:e.id,title:e.title,description:e.description,content:e.content,tags:e.story_tags?.map(e=>e.tags.name)||[],images:s(e.story_images),readingTime:e.reading_time,ageGroup:e.age_group,slug:e.slug,createdAt:e.created_at,updatedAt:e.updated_at}))||[]},async getBySlug(e){let{data:t,error:i}=await a.from("stories").select(`
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
      `).eq("slug",e).single();if(i)throw console.error("Error fetching story:",i),i;return t?{id:t.id,title:t.title,description:t.description,content:t.content,tags:t.story_tags?.map(e=>e.tags.name)||[],images:s(t.story_images),readingTime:t.reading_time,ageGroup:t.age_group,slug:t.slug,createdAt:t.created_at,updatedAt:t.updated_at}:null},async getById(e){let{data:t,error:i}=await a.from("stories").select(`
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
      `).eq("id",e).single();if(i)throw console.error("Error fetching story:",i),i;return t?{id:t.id,title:t.title,description:t.description,content:t.content,tags:t.story_tags?.map(e=>e.tags.name)||[],images:s(t.story_images),readingTime:t.reading_time,ageGroup:t.age_group,slug:t.slug,createdAt:t.created_at,updatedAt:t.updated_at}:null},async getByTagSlug(e){let{data:t,error:i}=await a.from("stories").select(`
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
      `).eq("story_tags.tags.slug",e).order("created_at",{ascending:!1});if(i)throw console.error("Error fetching stories by tag:",i),i;return t?.map(e=>({id:e.id,title:e.title,description:e.description,content:e.content,tags:e.story_tags?.map(e=>e.tags.name)||[],images:s(e.story_images),readingTime:e.reading_time,ageGroup:e.age_group,slug:e.slug,createdAt:e.created_at,updatedAt:e.updated_at}))||[]},async getByTag(e){let{data:t,error:i}=await a.from("stories").select(`
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
      `).eq("story_tags.tags.name",e).order("created_at",{ascending:!1});if(i)throw console.error("Error fetching stories by tag:",i),i;return t?.map(e=>({id:e.id,title:e.title,description:e.description,content:e.content,tags:e.story_tags?.map(e=>e.tags.name)||[],images:s(e.story_images),readingTime:e.reading_time,ageGroup:e.age_group,slug:e.slug,createdAt:e.created_at,updatedAt:e.updated_at}))||[]},async search(e){if(!e.trim())return[];let{data:t,error:i}=await a.from("stories").select(`
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
      `).or(`title.ilike.%${e}%,description.ilike.%${e}%,content.ilike.%${e}%`).order("created_at",{ascending:!1});if(i)throw console.error("Error searching stories:",i),i;return t?.map(e=>({id:e.id,title:e.title,description:e.description,content:e.content,tags:e.story_tags?.map(e=>e.tags.name)||[],images:s(e.story_images),readingTime:e.reading_time,ageGroup:e.age_group,slug:e.slug,createdAt:e.created_at,updatedAt:e.updated_at}))||[]}}}}]);