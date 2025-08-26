"use strict";exports.id=240,exports.ids=[240],exports.modules={2240:(a,b,c)=>{c.d(b,{storiesApi:()=>f,tagsApi:()=>g});let d=(0,c(3939).createClient)("https://ioornfyxmqejmhapdfvg.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlvb3JuZnl4bXFlam1oYXBkZnZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMjk4NTQsImV4cCI6MjA2NzgwNTg1NH0.DymS3VOr6HjYktNOTk5n_UktDDDkkbha7-9kdg-ymcY"),e=a=>a?.map(a=>({id:a.id,src:a.src,alt:a.alt,position:a.position,fileName:a.file_name,fileSize:a.file_size,mimeType:a.mime_type,storagePath:a.storage_path}))||[],f={async getAll(){let{data:a,error:b}=await d.from("stories").select(`
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
      `).order("created_at",{ascending:!1});if(b)throw console.error("Error fetching stories:",b),b;return a?.map(a=>({id:a.id,title:a.title,description:a.description,content:a.content,tags:a.story_tags?.map(a=>a.tags.name)||[],images:e(a.story_images),readingTime:a.reading_time,ageGroup:a.age_group,slug:a.slug,createdAt:a.created_at,updatedAt:a.updated_at}))||[]},async getBySlug(a){let{data:b,error:c}=await d.from("stories").select(`
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
      `).eq("slug",a).single();if(c)throw console.error("Error fetching story:",c),c;return b?{id:b.id,title:b.title,description:b.description,content:b.content,tags:b.story_tags?.map(a=>a.tags.name)||[],images:e(b.story_images),readingTime:b.reading_time,ageGroup:b.age_group,slug:b.slug,createdAt:b.created_at,updatedAt:b.updated_at}:null},async getById(a){let{data:b,error:c}=await d.from("stories").select(`
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
      `).eq("id",a).single();if(c)throw console.error("Error fetching story:",c),c;return b?{id:b.id,title:b.title,description:b.description,content:b.content,tags:b.story_tags?.map(a=>a.tags.name)||[],images:e(b.story_images),readingTime:b.reading_time,ageGroup:b.age_group,slug:b.slug,createdAt:b.created_at,updatedAt:b.updated_at}:null},async getByTagSlug(a){let{data:b,error:c}=await d.from("stories").select(`
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
      `).eq("story_tags.tags.slug",a).order("created_at",{ascending:!1});if(c)throw console.error("Error fetching stories by tag:",c),c;return b?.map(a=>({id:a.id,title:a.title,description:a.description,content:a.content,tags:a.story_tags?.map(a=>a.tags.name)||[],images:e(a.story_images),readingTime:a.reading_time,ageGroup:a.age_group,slug:a.slug,createdAt:a.created_at,updatedAt:a.updated_at}))||[]},async getByTag(a){let{data:b,error:c}=await d.from("stories").select(`
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
      `).eq("story_tags.tags.name",a).order("created_at",{ascending:!1});if(c)throw console.error("Error fetching stories by tag:",c),c;return b?.map(a=>({id:a.id,title:a.title,description:a.description,content:a.content,tags:a.story_tags?.map(a=>a.tags.name)||[],images:e(a.story_images),readingTime:a.reading_time,ageGroup:a.age_group,slug:a.slug,createdAt:a.created_at,updatedAt:a.updated_at}))||[]},async search(a){if(!a.trim())return[];let{data:b,error:c}=await d.from("stories").select(`
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
      `).or(`title.ilike.%${a}%,description.ilike.%${a}%,content.ilike.%${a}%`).order("created_at",{ascending:!1});if(c)throw console.error("Error searching stories:",c),c;return b?.map(a=>({id:a.id,title:a.title,description:a.description,content:a.content,tags:a.story_tags?.map(a=>a.tags.name)||[],images:e(a.story_images),readingTime:a.reading_time,ageGroup:a.age_group,slug:a.slug,createdAt:a.created_at,updatedAt:a.updated_at}))||[]}},g={async getAll(){let{data:a,error:b}=await d.from("tags").select("*").order("name");if(b)throw console.error("Error fetching tags:",b),b;return a||[]},async getBySlug(a){let{data:b,error:c}=await d.from("tags").select("*").eq("slug",a).single();if(c)throw console.error("Error fetching tag:",c),c;return b},async getByName(a){let{data:b,error:c}=await d.from("tags").select("*").eq("name",a).single();if(c)throw console.error("Error fetching tag:",c),c;return b}}}};