# Generate static homepage pagination without an additional gem.
module Blog
  class HomePagination < Jekyll::Generator
    safe false
    priority :low

    def generate(site)
      home = site.pages.find { |page| page.url == "/" && page.data["layout"] == "home" }
      return unless home

      per_page = Integer(site.config.fetch("posts_per_page", 10))
      raise Jekyll::Errors::FatalException, "posts_per_page must be a positive integer" if per_page <= 0

      posts = site.posts.docs.sort_by { |post| [post.date, post.relative_path] }.reverse
      total_pages = [(posts.size.to_f / per_page).ceil, 1].max
      paths = (1..total_pages).map { |number| page_path(site, number) }

      (1..total_pages).each do |number|
        page = home
        if number > 1
          page = Jekyll::PageWithoutAFile.new(site, site.source, paths[number - 1].delete_prefix("/"), "index.html")
          page.content = home.content
          page.data = home.data.reject { |key, _| ["permalink", "pagination"].include?(key) }.merge("title" => "第 #{number} 页")
          site.pages << page
        end

        page.data["pagination"] = {
          "posts" => posts.slice((number - 1) * per_page, per_page) || [],
          "page" => number,
          "per_page" => per_page,
          "total_posts" => posts.size,
          "total_pages" => total_pages,
          "previous_path" => number > 1 ? paths[number - 2] : nil,
          "next_path" => number < total_pages ? paths[number] : nil,
          "pages" => (1..total_pages).filter_map do |index|
            next unless index == 1 || index == total_pages || (index - number).abs <= 2
            { "number" => index, "path" => paths[index - 1] }
          end,
        }
      end
    rescue ArgumentError, TypeError
      raise Jekyll::Errors::FatalException, "posts_per_page must be a positive integer"
    end

    def page_path(site, number)
      return "/" if number == 1
      path = site.config.fetch("pagination_path", "/page/:num/").sub(":num", number.to_s)
      raise Jekyll::Errors::FatalException, "pagination_path must contain :num and start with /" unless path.start_with?("/") && site.config.fetch("pagination_path", "/page/:num/").include?(":num")
      path.end_with?("/") ? path : "#{path}/"
    end
  end
end
