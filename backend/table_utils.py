from rest_framework import pagination


class SortField:
    SORT_DIR_ASC = "asc"
    SORT_DIR_DESC = "desc"

    def __init__(self, sort_by, sort_dir=SORT_DIR_ASC):
        self.sort_by = sort_by
        self.sort_dir = sort_dir

    def __repr__(self):
        return f"SortField({self.sort_by}, {self.sort_dir})"


class StandardResultsSetPagination(pagination.PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 50
