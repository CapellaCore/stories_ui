"use strict";exports.id=240,exports.ids=[240],exports.modules={2240:(a,b,c)=>{c.d(b,{storiesApi:()=>i,tagsApi:()=>j});var d=c(3939);let e="https://ioornfyxmqejmhapdfvg.supabase.co",f="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlvb3JuZnl4bXFlam1oYXBkZnZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMjk4NTQsImV4cCI6MjA2NzgwNTg1NH0.DymS3VOr6HjYktNOTk5n_UktDDDkkbha7-9kdg-ymcY",g=e&&f?(0,d.createClient)(e,f):null,h=a=>a?.map(a=>({id:a.id,src:a.src,alt:a.alt,position:a.position,fileName:a.file_name,fileSize:a.file_size,mimeType:a.mime_type,storagePath:a.storage_path}))||[],i={async getAll(){if(!g)return console.warn("Supabase client not initialized - returning empty array"),[];let{data:a,error:b}=await g.from("stories").select(`
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
      `).order("created_at",{ascending:!1});if(b)throw console.error("Error fetching stories:",b),b;return a?.map(a=>({id:a.id,title:a.title,description:a.description,content:a.content,tags:a.story_tags?.map(a=>a.tags.name)||[],images:h(a.story_images),readingTime:a.reading_time,ageGroup:a.age_group,slug:a.slug,createdAt:a.created_at,updatedAt:a.updated_at}))||[]},async getBySlug(a){if(!g)return console.warn("Supabase client not initialized - returning null"),null;let{data:b,error:c}=await g.from("stories").select(`
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
      `).eq("slug",a).single();if(c)throw console.error("Error fetching story:",c),c;return b?{id:b.id,title:b.title,description:b.description,content:b.content,tags:b.story_tags?.map(a=>a.tags.name)||[],images:h(b.story_images),readingTime:b.reading_time,ageGroup:b.age_group,slug:b.slug,createdAt:b.created_at,updatedAt:b.updated_at}:null},async getById(a){if(!g)return console.warn("Supabase client not initialized - returning null"),null;let{data:b,error:c}=await g.from("stories").select(`
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
      `).eq("id",a).single();if(c)throw console.error("Error fetching story:",c),c;return b?{id:b.id,title:b.title,description:b.description,content:b.content,tags:b.story_tags?.map(a=>a.tags.name)||[],images:h(b.story_images),readingTime:b.reading_time,ageGroup:b.age_group,slug:b.slug,createdAt:b.created_at,updatedAt:b.updated_at}:null},async getByTagSlug(a){if(!g)return console.warn("Supabase client not initialized - returning empty array"),[];let{data:b,error:c}=await g.from("stories").select(`
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
      `).eq("story_tags.tags.slug",a).order("created_at",{ascending:!1});if(c)throw console.error("Error fetching stories by tag:",c),c;return b?.map(a=>({id:a.id,title:a.title,description:a.description,content:a.content,tags:a.story_tags?.map(a=>a.tags.name)||[],images:h(a.story_images),readingTime:a.reading_time,ageGroup:a.age_group,slug:a.slug,createdAt:a.created_at,updatedAt:a.updated_at}))||[]},async getByTag(a){if(!g)return console.warn("Supabase client not initialized - returning empty array"),[];let{data:b,error:c}=await g.from("stories").select(`
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
      `).eq("story_tags.tags.name",a).order("created_at",{ascending:!1});if(c)throw console.error("Error fetching stories by tag:",c),c;return b?.map(a=>({id:a.id,title:a.title,description:a.description,content:a.content,tags:a.story_tags?.map(a=>a.tags.name)||[],images:h(a.story_images),readingTime:a.reading_time,ageGroup:a.age_group,slug:a.slug,createdAt:a.created_at,updatedAt:a.updated_at}))||[]},async search(a){if(!a.trim())return[];if(!g)return console.warn("Supabase client not initialized - returning empty array"),[];let{data:b,error:c}=await g.from("stories").select(`
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
      `).or(`title.ilike.%${a}%,description.ilike.%${a}%,content.ilike.%${a}%`).order("created_at",{ascending:!1});if(c)throw console.error("Error searching stories:",c),c;return b?.map(a=>({id:a.id,title:a.title,description:a.description,content:a.content,tags:a.story_tags?.map(a=>a.tags.name)||[],images:h(a.story_images),readingTime:a.reading_time,ageGroup:a.age_group,slug:a.slug,createdAt:a.created_at,updatedAt:a.updated_at}))||[]}},j={async getAll(){if(!g)return console.warn("Supabase client not initialized - returning empty array"),[];let{data:a,error:b}=await g.from("tags").select("*").order("name");if(b)throw console.error("Error fetching tags:",b),b;return a||[]},async getBySlug(a){if(!g)return console.warn("Supabase client not initialized - returning null"),null;let{data:b,error:c}=await g.from("tags").select("*").eq("slug",a).single();if(c)throw console.error("Error fetching tag:",c),c;return b},async getByName(a){if(!g)return console.warn("Supabase client not initialized - returning null"),null;let{data:b,error:c}=await g.from("tags").select("*").eq("name",a).single();if(c)throw console.error("Error fetching tag:",c),c;return b}}}};